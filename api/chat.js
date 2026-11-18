// Asistente con IA de 7 Strength Center, usando Gemini (Google) en su plan gratuito.
// Funciona igual en Vercel (función /api/chat) y en el servidor local (INICIAR.cmd).
// Clave gratis en https://aistudio.google.com/apikey
//   - Local: archivo .env con  GEMINI_API_KEY=tu-clave
//   - Vercel: Settings → Environment Variables → GEMINI_API_KEY
// Opcional: GEMINI_MODEL=otro-modelo (por defecto gemini-3.5-flash-lite).
// Si no hay clave, la web usa respuestas automáticas básicas.
import { siteConfig as c } from "../src/site-config.js";

const MODEL = () => process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

function buildSystemPrompt() {
  const plans = c.plans
    .map((p) => `- ${p.name}: ${p.formattedPrice} por ${p.period}. ${p.description} Incluye: ${p.features.join("; ")}.`)
    .join("\n");
  const trainers = c.trainers
    .map((t) => `- ${t.name} (${t.role}), ${t.years} años de experiencia. ${t.bio} Te ayuda a: ${t.helps.join("; ")}. Atiende: ${t.schedule}.`)
    .join("\n");
  const h = c.hours;
  return `Eres el asistente virtual de ${c.name}, un gimnasio de fuerza en ${c.city}. Respondes a visitantes de la página web.

Cómo responder:
- Siempre en español, con tono cercano y motivador, en 1 a 4 frases cortas. Sin títulos, tablas ni markdown.
- Usa solo la información de abajo. Si te preguntan algo que no está aquí (precios no listados, promociones, disponibilidad de un día concreto), di que no lo sabes con certeza y sugiere escribir por WhatsApp al ${c.phone.display}.
- Puedes dar consejos generales de entrenamiento y nutrición, pero no diagnósticos médicos; ante lesiones o dolor, recomienda consultar a un profesional de salud.
- Si alguien quiere inscribirse o reservar, invítalo a escribir por WhatsApp al ${c.phone.display}.
- No inventes datos, nombres ni precios.

Información del gimnasio:
Descripción: ${c.description}
Dirección: ${c.address}. Google Maps: ${c.googleMapsUrl}
WhatsApp: ${c.phone.display}
Instagram: ${c.social.instagramHandle}
Modalidades: entrenamiento presencial y virtual. Sin contratos de permanencia.

Horarios:
- ${h.weekdays.days}: ${h.weekdays.shifts.map((s) => `${s.name} ${s.timeRange}`).join(", ")}. ${h.weekdays.pauseNotice}.
- ${h.saturday.days}: ${h.saturday.shifts.map((s) => `${s.name} ${s.timeRange}`).join(", ")}.
- ${h.sunday.days}: ${h.sunday.statusNote}. ${h.sunday.advice}

Planes:
${plans}

Zonas y equipamiento: powerlifting (barras olímpicas, discos bumper, plataformas, banco de competición), peso libre (power racks, mancuernas, bancos), máquinas (prensa inclinada, hack squat, poleas) y zona funcional con césped sintético, trineo y TRX, en dos niveles.

Entrenadores:
${trainers}`;
}
const SYSTEM_PROMPT = buildSystemPrompt();

// Límite sencillo: 15 mensajes por minuto por visitante.
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 60_000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 15;
}

async function readJson(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body);
  let data = "";
  for await (const chunk of req) {
    data += chunk;
    if (data.length > 20_000) throw new Error("too-large");
  }
  return JSON.parse(data || "{}");
}

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== "POST") return send(res, 405, { error: "method" });
  const key = process.env.GEMINI_API_KEY;
  if (!key) return send(res, 503, { error: "no-key" });
  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "local").split(",")[0].trim();
  if (limited(ip)) return send(res, 429, { error: "rate" });

  let messages;
  try {
    const parsed = await readJson(req);
    // Solo turnos de texto; últimos 12, máximo 1000 caracteres cada uno.
    messages = (Array.isArray(parsed.messages) ? parsed.messages : [])
      .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
      .slice(-12)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 1000) }));
    while (messages.length && messages[0].role !== "user") messages.shift();
    if (!messages.length || messages[messages.length - 1].role !== "user") throw new Error("bad");
  } catch {
    return send(res, 400, { error: "bad-request" });
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(MODEL())}:generateContent`;
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: messages.map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] })),
        generationConfig: { maxOutputTokens: 600, temperature: 0.6 },
      }),
      signal: AbortSignal.timeout(20_000),
    });
    if (r.status === 429) return send(res, 429, { error: "rate" });
    if (r.status === 400 || r.status === 401 || r.status === 403) {
      console.error(`Chat IA: Gemini rechazó la petición (${r.status}). Revisa GEMINI_API_KEY o GEMINI_MODEL.`, (await r.text()).slice(0, 300));
      return send(res, 503, { error: "no-key" });
    }
    if (!r.ok) {
      console.error(`Chat IA: error ${r.status} de Gemini.`, (await r.text()).slice(0, 300));
      return send(res, 502, { error: "api" });
    }
    const data = await r.json();
    const reply = (data.candidates?.[0]?.content?.parts || []).map((p) => p.text || "").join("").trim();
    return send(res, 200, { reply: reply || "No tengo una respuesta ahora mismo. Escríbenos por WhatsApp y te ayudamos." });
  } catch (error) {
    console.error("Chat IA:", error.message);
    return send(res, 502, { error: "network" });
  }
}
