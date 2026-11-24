// Renders public/og.png (1200x630), app/apple-icon.png (180x180) from the seal design.
// Needs Google Chrome installed. Run: node scripts/make-og.mjs
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const seal = readFileSync(new URL("../public/svg/seal.svg", import.meta.url), "utf8")
  .replace('width="200" height="200"', 'width="400" height="400"');
const grain = readFileSync(new URL("../public/textures/grain.svg", import.meta.url), "utf8");
const grainUri = "data:image/svg+xml;base64," + Buffer.from(grain).toString("base64");

const html = (body, size) => `<!doctype html><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet">
<style>*{margin:0;box-sizing:border-box}body{${size};background:#F4EFE6;position:relative;overflow:hidden;font-family:Newsreader,Georgia,serif;color:#16191D}
.g{position:absolute;inset:0;background:url(${grainUri});background-size:220px;opacity:.04}</style><body>${body}</body>`;

const b = await chromium.launch({ channel: "chrome" });

const og = await b.newPage({ viewport: { width: 1200, height: 630 } });
await og.setContent(
  html(
    `<div style="position:absolute;left:72px;top:100px;color:#1E3B33;filter:drop-shadow(1px 1px 0 rgba(255,255,255,.7))">${seal.replace(/font-family="[^"]*Newsreader[^"]*"/g, 'font-family="Newsreader, serif"').replace(/font-family="[^"]*Plex[^"]*"/g, 'font-family="IBM Plex Mono, monospace"')}</div>
     <div style="position:absolute;left:540px;top:150px;right:72px">
       <div style="font:400 20px 'IBM Plex Mono',monospace;letter-spacing:.12em;color:#4A4F55">ADVOCATES &amp; SOLICITORS · ROORKEE</div>
       <div style="font-size:92px;line-height:1.02;letter-spacing:-.02em;margin-top:28px">The Law<br>&amp; Lawyers</div>
       <div style="height:1px;background:#A88A55;margin-top:36px;width:100%"></div>
       <div style="font:400 20px 'IBM Plex Mono',monospace;letter-spacing:.08em;color:#6E5A2E;margin-top:20px">REGISTERED PARTNERSHIP FIRM · EST. 2021</div>
     </div>
     <div class="g"></div>`,
    "width:1200px;height:630px",
  ),
  { waitUntil: "networkidle" },
);
await og.evaluate(() => document.fonts.ready);
await og.waitForTimeout(500);
await og.screenshot({ path: fileURLToPath(new URL("../public/og.png", import.meta.url)) });

const ic = await b.newPage({ viewport: { width: 180, height: 180 } });
await ic.setContent(
  html(
    `<div style="position:absolute;inset:0;display:grid;place-items:center;color:#1E3B33"><svg viewBox="0 0 64 64" width="164" height="164"><g fill="none" stroke="#1E3B33"><circle cx="32" cy="32" r="29" stroke-width="2.4"/><circle cx="32" cy="32" r="25" stroke-width="1"/></g><text x="32" y="40.5" text-anchor="middle" fill="#1E3B33" font-family="Newsreader, serif" font-style="italic" font-size="25" letter-spacing="-1">L&amp;L</text></svg></div>`,
    "width:180px;height:180px",
  ),
  { waitUntil: "networkidle" },
);
await ic.evaluate(() => document.fonts.ready);
await ic.waitForTimeout(400);
await ic.screenshot({ path: fileURLToPath(new URL("../app/apple-icon.png", import.meta.url)) });
await b.close();
console.log("og.png and apple-icon.png written");
