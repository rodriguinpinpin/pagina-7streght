import test from 'node:test';
import assert from 'node:assert/strict';
import { buildWhatsAppLink, formatSoles, calculateGymStatus } from './gymLogic.ts';
import { GYM_CONFIG } from '../config/gymInfo.ts';

test('buildWhatsAppLink generates correct URL with default message', () => {
  const url = buildWhatsAppLink();
  assert.match(url, /^https:\/\/wa\.me\/51976795498\?text=/);
  assert.ok(url.includes(encodeURIComponent(GYM_CONFIG.phone.whatsappMessageGeneral)));
});

test('buildWhatsAppLink generates custom message URL', () => {
  const custom = 'Hola, consulta por plan mensual';
  const url = buildWhatsAppLink(custom);
  assert.equal(url, `https://wa.me/51976795498?text=${encodeURIComponent(custom)}`);
});

test('formatSoles formats properly to 2 decimals', () => {
  assert.equal(formatSoles(15), 'S/ 15.00');
  assert.equal(formatSoles(120), 'S/ 120.00');
  assert.equal(formatSoles(15.5), 'S/ 15.50');
});

test('calculateGymStatus correctly flags morning shift on weekday', () => {
  // A Wednesday at 9:30 AM Peru time (14:30 UTC)
  const wednesdayMorning = new Date('2026-10-28T14:30:00Z');
  const status = calculateGymStatus(wednesdayMorning);
  assert.equal(status.isOpen, true);
  assert.equal(status.isPaused, false);
  assert.match(status.statusLabel, /Turno Mañana/);
});

test('calculateGymStatus correctly flags lunch pause between 1:00pm and 3:00pm', () => {
  // A Wednesday at 2:15 PM Peru time (19:15 UTC)
  const wednesdayPause = new Date('2026-10-28T19:15:00Z');
  const status = calculateGymStatus(wednesdayPause);
  assert.equal(status.isOpen, false);
  assert.equal(status.isPaused, true);
  assert.equal(status.statusLabel, 'Pausa intermedia');
});

test('calculateGymStatus correctly flags afternoon shift on weekday', () => {
  // A Wednesday at 5:00 PM Peru time (22:00 UTC)
  const wednesdayAfternoon = new Date('2026-10-28T22:00:00Z');
  const status = calculateGymStatus(wednesdayAfternoon);
  assert.equal(status.isOpen, true);
  assert.equal(status.isPaused, false);
  assert.match(status.statusLabel, /Turno Tarde/);
});

test('calculateGymStatus flags unconfirmed hours for Sunday', () => {
  // A Sunday at 10:00 AM Peru time (15:00 UTC)
  const sunday = new Date('2026-11-01T15:00:00Z');
  const status = calculateGymStatus(sunday);
  assert.equal(status.isOpen, false);
  assert.equal(status.statusLabel, 'Horario no confirmado');
});
