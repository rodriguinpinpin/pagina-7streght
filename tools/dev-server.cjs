const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const Babel = require('./babel.cjs');
const root = path.resolve(__dirname, '..');
// Lee el archivo .env (por ejemplo ANTHROPIC_API_KEY=...) si existe.
try {
  for (const line of fs.readFileSync(path.join(root, '.env'), 'utf8').split(/\r?\n/)) {
    const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/.exec(line);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
} catch {}
// El chat usa la misma función que en Vercel: api/chat.js
const { pathToFileURL } = require('node:url');
const chat = import(pathToFileURL(path.join(root, 'api/chat.js')).href).catch((error) => {
  console.warn('Chat IA desactivado: ' + error.message);
  return null;
});
const source = path.join(root, 'src/App.jsx');
function compile() {
  const result = Babel.transform(fs.readFileSync(source, 'utf8'), {
    filename: 'App.jsx',
    presets: [['react', { runtime: 'classic' }]],
    sourceMaps: 'inline',
  });
  fs.writeFileSync(path.join(root, 'src/App.js'), result.code);
}
compile();
if (process.argv.includes('--build')) {
  console.log('Listo: src/App.js actualizado desde src/App.jsx.');
  process.exit(0);
}
const clients = new Set();
const reloadScript = `<script>const live = new EventSource('/__live'); live.onmessage = (event) => { if (event.data === 'reload') location.reload(); else console.error(event.data); };</script>`;
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' };
const server = http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400); res.end('Solicitud inválida'); return; }
  if (pathname === '/api/chat') {
    chat.then((mod) => {
      if (!mod) { res.writeHead(503, { 'Content-Type': 'application/json' }); res.end('{"error":"no-key"}'); return; }
      return mod.default(req, res);
    });
    return;
  }
  if (pathname === '/__live') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
    res.write(': connected\n\n'); clients.add(res);
    req.on('close', () => clients.delete(res)); return;
  }
  if (pathname === '/favicon.ico') { res.writeHead(204); res.end(); return; }
  const file = path.resolve(root, '.' + pathname, ...(pathname.endsWith('/') ? ['index.html'] : []));
  const relative = path.relative(root, file);
  if (relative.startsWith('..') || path.isAbsolute(relative)) { res.writeHead(403); res.end(); return; }
  try {
    const type = mime[path.extname(file)] || 'application/octet-stream';
    if (path.extname(file) === '.mp4') {
      const size = fs.statSync(file).size;
      const m = /bytes=(\d*)-(\d*)/.exec(req.headers.range || '');
      if (m) {
        const start = m[1] ? Number(m[1]) : 0, end = m[2] ? Number(m[2]) : size - 1;
        res.writeHead(206, { 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': end - start + 1 });
        fs.createReadStream(file, { start, end }).pipe(res);
      } else {
        res.writeHead(200, { 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Content-Length': size });
        fs.createReadStream(file).pipe(res);
      }
      return;
    }
    let data = fs.readFileSync(file);
    if (path.extname(file) === '.html') data = Buffer.from(data.toString('utf8').replace('</body>', reloadScript + '</body>'));
    res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(data);
  } catch { res.writeHead(404); res.end('Archivo no encontrado'); }
});
let pending;
let jsxChanged = false;
for (const folder of ['src', 'styles', 'assets']) {
  fs.watch(path.join(root, folder), { recursive: true }, (_, file) => {
    if (!file || file === 'App.js') return;
    if (folder === 'src' && file.endsWith('.jsx')) jsxChanged = true;
    clearTimeout(pending);
    pending = setTimeout(() => {
      try {
        if (jsxChanged) { compile(); jsxChanged = false; }
        for (const client of clients) client.write('data: reload\n\n');
        console.log('Actualizado: ' + folder + '/' + file);
      } catch (error) {
        console.error(error.message);
        for (const client of clients) client.write('data: ' + JSON.stringify(error.message) + '\n\n');
      }
    }, 150);
  });
}
fs.watchFile(path.join(root, 'index.html'), { interval: 500 }, () => {
  for (const client of clients) client.write('data: reload\n\n');
});
const port = Number(process.env.PORT || 5173);
server.on('error', error => {
  console.error(error.code === 'EADDRINUSE' ? `El puerto ${port} ya está ocupado. Cierra la otra vista previa o configura PORT.` : error.message);
  process.exit(1);
});
server.listen(port, '127.0.0.1', () => {
  console.log(`\n7 Strength Center: http://127.0.0.1:${port}\nGuarda tus cambios para recargar la página. Ctrl+C para detener.\n`);
  if (process.argv.includes('--open')) {
    const { spawn } = require('node:child_process');
    spawn('powershell.exe', ['-NoProfile', '-Command', `Start-Process 'http://127.0.0.1:${port}'`], { windowsHide: true, stdio: 'ignore' });
  }
});
