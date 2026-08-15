import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const appUrl = new URL("../src/App.tsx", import.meta.url);

test("keeps the two entry journeys equally explicit", async () => {
  const source = await readFile(appUrl, "utf8");

  assert.match(source, /Construir para minha empresa/);
  assert.match(source, /Construir minha trajetória com IA/);
  assert.match(source, /Ver projetos e agendar uma conversa/);
  assert.match(source, /Conhecer a mentoria e me candidatar/);
});

test("contains the promised business and mentorship conversion details", async () => {
  const source = await readFile(appUrl, "utf8");

  assert.match(source, /45 minutos pelo Google Meet/);
  assert.match(source, /Nome<input required/);
  assert.match(source, /BOOKING_EMBED_URL/);
  assert.match(source, /calendar\.app\.google/);
  assert.match(source, /4 encontros de 1 hora/);
  assert.match(source, /R\$ 1\.500/);
  assert.match(source, /retornarei pelo WhatsApp em até 24 horas/i);
});

test("ships every image referenced by the initial experience", async () => {
  for (const relativePath of [
    "../public/assets/brand/mateus-nogueira.png",
    "../public/assets/hero-company-system.png",
    "../public/assets/hero-mentorship-notes.png",
    "../public/assets/projects/operations-dashboard.png",
  ]) {
    const file = await stat(new URL(relativePath, import.meta.url));
    assert.ok(file.isFile());
    assert.ok(file.size > 10_000);
  }
});
