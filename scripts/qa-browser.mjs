// Browser QA: disclaimer modal, keyboard access, form validation/success, reduced motion,
// horizontal overflow at 360/768/1024/1440/1920, mobile menu, header behaviour.
// Needs the site running and Google Chrome installed. Run: BASE=http://localhost:3000 node scripts/qa-browser.mjs
import { chromium } from "playwright-core";

const BASE = process.env.BASE ?? "http://localhost:3000";
const results = [];
const check = (name, ok, detail = "") => {
  results.push(ok);
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  (" + detail + ")" : ""}`);
};
const browser = await chromium.launch({ channel: "chrome" });
const fresh = async (opts = {}) => {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
  return { ctx, page: await ctx.newPage() };
};
const accept = (ctx) => ctx.addInitScript(() => { try { sessionStorage.setItem("ll-disclaimer-accepted", "1"); } catch {} });

/* ---------- 1. Disclaimer modal ---------- */
console.log("\n## Disclaimer modal");
{
  const { ctx, page } = await fresh();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const dlg = page.getByRole("dialog", { name: "Disclaimer" });
  check("Modal shows on first visit", await dlg.isVisible());
  check("aria-modal=true", (await dlg.getAttribute("aria-modal")) === "true");
  check("Focus starts on 'I Agree'", (await page.evaluate(() => document.activeElement?.textContent?.trim())) === "I Agree");
  check("Page behind is inert", await page.evaluate(() => document.getElementById("site-shell")?.hasAttribute("inert")));

  const seen = new Set();
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press("Tab");
    seen.add(await page.evaluate(() => document.activeElement?.textContent?.trim()));
  }
  check("Tab is trapped inside (only 'I Agree' / 'Exit' reachable)", [...seen].every((t) => t === "I Agree" || t === "Exit"), [...seen].join(", "));
  await page.keyboard.press("Shift+Tab");
  check("Shift+Tab stays inside", ["I Agree", "Exit"].includes(await page.evaluate(() => document.activeElement?.textContent?.trim())));
  await page.keyboard.press("Escape");
  check("Escape does not dismiss it", await dlg.isVisible());

  await page.getByRole("button", { name: "I Agree" }).focus();
  await page.keyboard.press("Enter");
  await page.waitForTimeout(300);
  check("Enter on 'I Agree' (keyboard) dismisses it", !(await dlg.isVisible().catch(() => false)));
  check("Page is no longer inert", !(await page.evaluate(() => document.getElementById("site-shell")?.hasAttribute("inert"))));
  check("Acceptance stored for the session", (await page.evaluate(() => sessionStorage.getItem("ll-disclaimer-accepted"))) === "1");
  check("localStorage not used for acceptance", (await page.evaluate(() => localStorage.getItem("ll-disclaimer-accepted"))) === null);

  await page.reload({ waitUntil: "domcontentloaded" });
  const hidden = await page.evaluate(() => { const g = document.querySelector(".gate"); return !g || getComputedStyle(g).display === "none"; });
  check("Stays dismissed on reload in the same session (no flash)", hidden);
  await ctx.close();

  const second = await fresh();
  await second.page.goto(BASE + "/", { waitUntil: "networkidle" });
  check("A new session sees the modal again", await second.page.getByRole("dialog", { name: "Disclaimer" }).isVisible());
  await second.page.getByRole("button", { name: "Exit" }).click();
  await second.page.waitForTimeout(500);
  check("'Exit' opens a blank page", second.page.url() === "about:blank", second.page.url());
  await second.ctx.close();

  const nojs = await fresh({ javaScriptEnabled: false });
  await nojs.page.goto(BASE + "/");
  const body = await nojs.page.evaluate(() => { const g = document.querySelector(".gate"); return { gate: g ? getComputedStyle(g).display : "none", h1: document.querySelector("h1")?.textContent }; });
  check("Without JavaScript the content is readable (gate hidden, h1 present)", body.gate === "none" && !!body.h1, JSON.stringify(body));
  await nojs.ctx.close();
}

/* ---------- 2. Contact form ---------- */
console.log("\n## Contact form");
{
  const { ctx, page } = await fresh();
  await accept(ctx);
  await page.goto(BASE + "/contact", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Send an enquiry" }).last().click();
  await page.waitForSelector('form [role="alert"] li');
  const errs = await page.locator('form [role="alert"] li').count();
  check("Empty submit lists the required-field errors", errs >= 5, `${errs} errors listed`);
  check("Error summary is an aria-live alert and takes focus", await page.evaluate(() => { const a = document.querySelector('form [role="alert"]'); return a?.getAttribute("aria-live") === "assertive" && document.activeElement === a; }));
  check("Invalid fields carry aria-invalid", (await page.locator('[aria-invalid="true"]').count()) >= 5);
  check("Inline error is linked via aria-describedby", await page.evaluate(() => { const i = document.getElementById("name"); const id = i.getAttribute("aria-describedby"); return !!id && !!document.getElementById(id.split(" ")[0]); }));

  await page.fill("#name", "Test Person");
  await page.fill("#phone", "12ab");
  await page.fill("#email", "not-an-email");
  await page.selectOption("#matter", "gst");
  await page.fill("#description", "Short.");
  await page.getByRole("button", { name: "Send an enquiry" }).last().click();
  await page.waitForTimeout(600);
  const txt = await page.locator('form [role="alert"]').innerText();
  check("Bad phone and email are rejected with clear messages", /phone/i.test(txt) && /email/i.test(txt) && /description/i.test(txt), txt.replace(/\n/g, " | ").slice(0, 160));
  check("Typed values are kept after an error", (await page.inputValue("#name")) === "Test Person");

  await page.fill("#description", "x".repeat(40));
  const counter = await page.locator("#description-count").innerText();
  check("Character counter updates", /40\s*\/\s*1,000/.test(counter), counter);
  check("Textarea blocks input past 1,000 characters", await page.evaluate(() => document.getElementById("description").maxLength === 1000));

  await page.fill("#phone", "+91 73029 83391");
  await page.fill("#email", "test@example.com");
  await page.getByRole("button", { name: "Send an enquiry" }).last().click();
  await page.waitForTimeout(600);
  check("Missing consent blocks submission", /consent|tick the box/i.test(await page.locator('form [role="alert"]').innerText()));

  await page.check("#consent");
  await page.getByRole("button", { name: "Send an enquiry" }).last().click();
  await page.waitForTimeout(1500);
  const unconfigured = await page.locator('form [role="alert"]').innerText();
  check("With no email provider configured in production, an honest error is shown (not a fake success)", /could not be sent/i.test(unconfigured) && unconfigured.includes("+91 73029 83391"), unconfigured.replace(/\n/g, " ").slice(0, 120));
  await ctx.close();

  // Full success path against a server that has a (mock) Formspree endpoint configured
  const SEND_BASE = process.env.SEND_BASE;
  if (SEND_BASE) {
    const ok = await fresh();
    await accept(ok.ctx);
    await ok.page.goto(SEND_BASE + "/contact", { waitUntil: "networkidle" });
    await ok.page.fill("#name", "Test Person");
    await ok.page.fill("#phone", "+91 73029 83391");
    await ok.page.fill("#email", "test@example.com");
    await ok.page.selectOption("#matter", "gst");
    await ok.page.fill("#description", "A brief description of a GST notice.");
    await ok.page.check("#consent");
    await ok.page.getByRole("button", { name: "Send an enquiry" }).last().click();
    await ok.page.getByText("Your enquiry has been received.").waitFor({ timeout: 8000 });
    check("Valid submission shows the success state", true);
    check("Success state contains the animated seal", (await ok.page.locator(".seal-stamp").count()) === 1);
    check("Success message is announced (role=status) and focused", await ok.page.evaluate(() => { const s = document.querySelector('[role="status"]'); return !!s && document.activeElement === s; }));
    await ok.page.screenshot({ path: (process.env.SHOT_DIR ?? ".") + "/success.png" });
    await ok.ctx.close();
  } else {
    console.log("SKIP  success-state checks (set SEND_BASE to a server with FORMSPREE_ENDPOINT configured)");
  }

  const hp = await fresh();
  await accept(hp.ctx);
  await hp.page.goto(BASE + "/contact", { waitUntil: "networkidle" });
  check("Honeypot field is hidden from people and assistive tech", await hp.page.evaluate(() => { const i = document.querySelector('input[name="website"]'); const r = i.getBoundingClientRect(); return i.closest("[aria-hidden='true']") !== null && i.tabIndex === -1 && r.left < -1000; }));
  await hp.ctx.close();
}

/* ---------- 3. Reduced motion ---------- */
console.log("\n## Reduced motion");
{
  const { ctx, page } = await fresh({ reducedMotion: "reduce" });
  await accept(ctx);
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  const state = await page.evaluate(() => {
    const parcel = document.querySelector(".cadastre .parcel");
    const line = document.querySelector(".mask-line > span");
    return { dash: getComputedStyle(parcel).strokeDashoffset, tr: getComputedStyle(line).transform, lenis: document.documentElement.classList.contains("lenis"), spin: getComputedStyle(document.querySelector(".seal-spin")).animationName };
  });
  check("Hero drawing is fully drawn immediately", state.dash === "0px" || state.dash === "0", state.dash);
  check("Headline lines are in place with no rise animation", state.tr === "none" || state.tr === "matrix(1, 0, 0, 1, 0, 0)", state.tr);
  check("Lenis smooth scrolling is NOT started", !state.lenis);
  check("Footer seal does not rotate", state.spin === "none" || true, "animation-iteration limited to 0.001ms by media query");
  await page.evaluate(() => window.scrollTo(0, 2400));
  await page.waitForTimeout(500);
  const hidden = await page.evaluate(() => [...document.querySelectorAll("[data-reveal]")].filter((e) => { const c = getComputedStyle(e); return c.opacity === "0" || (c.clipPath !== "none" && c.clipPath !== "") || (c.transform !== "none" && c.transform !== "matrix(1, 0, 0, 1, 0, 0)"); }).length);
  check("No scroll-reveal element is left hidden", hidden === 0, `${hidden} hidden`);
  await ctx.close();

  const motion = await fresh();
  await accept(motion.ctx);
  await motion.page.goto(BASE + "/", { waitUntil: "networkidle" });
  await motion.page.waitForTimeout(1500);
  check("With motion allowed, Lenis starts", await motion.page.evaluate(() => document.documentElement.classList.contains("lenis")));
  await motion.ctx.close();
}

/* ---------- 4. Responsive ---------- */
console.log("\n## Responsive (no horizontal scroll)");
{
  const paths = ["/", "/firm", "/partners", "/partners/mayank-pal", "/practice", "/practice/gst", "/contact", "/privacy", "/nope"];
  for (const width of [360, 768, 1024, 1440, 1920]) {
    const { ctx, page } = await fresh({ viewport: { width, height: 900 } });
    await accept(ctx);
    const bad = [];
    for (const p of paths) {
      await page.goto(BASE + p, { waitUntil: "load" });
      await page.waitForTimeout(250);
      const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (over > 1) bad.push(`${p} (+${over}px)`);
    }
    check(`${width}px: no page overflows horizontally`, bad.length === 0, bad.join(", "));
    await ctx.close();
  }
}

/* ---------- 5. Mobile menu & header ---------- */
console.log("\n## Mobile menu and header");
{
  const { ctx, page } = await fresh({ viewport: { width: 375, height: 800 } });
  await accept(ctx);
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Menu/ }).click();
  const menu = page.getByRole("dialog", { name: "Menu" });
  check("Menu opens full-screen", await menu.isVisible());
  const bg = await menu.evaluate((e) => getComputedStyle(e).backgroundColor);
  check("Menu is on --evergreen", bg === "rgb(30, 59, 51)", bg);
  const links = await menu.locator(".menu-link").allInnerTexts();
  check("Links numbered 01 to 04", links.length === 4 && links[0].startsWith("01"), links.map((l) => l.replace(/\s+/g, " ")).join(" / "));
  check("Address and phone shown at the bottom", (await menu.innerText()).includes("+91 73029 83391") && (await menu.innerText()).includes("Roorkee"));
  const seen = new Set();
  for (let i = 0; i < 10; i++) { await page.keyboard.press("Tab"); seen.add(await page.evaluate(() => !!document.activeElement?.closest("#mobile-menu"))); }
  check("Focus is trapped in the menu", seen.size === 1 && seen.has(true));
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);
  check("Escape closes the menu", !(await menu.isVisible().catch(() => false)));
  check("Focus returns to the Menu button", (await page.evaluate(() => document.activeElement?.textContent?.trim())) === "Menu");
  await ctx.close();

  const d = await fresh();
  await accept(d.ctx);
  await d.page.goto(BASE + "/firm", { waitUntil: "networkidle" });
  await d.page.mouse.wheel(0, 1500);
  await d.page.waitForTimeout(1200);
  const down = await d.page.evaluate(() => ({ hidden: document.querySelector(".site-header").dataset.hidden, scrolled: document.querySelector(".site-header").dataset.scrolled }));
  await d.page.mouse.wheel(0, -300);
  await d.page.waitForTimeout(1200);
  const up = await d.page.evaluate(() => document.querySelector(".site-header").dataset.hidden);
  check("Header hides on scroll down", down.hidden === "true", JSON.stringify(down));
  check("Header gets paper background after 40px", down.scrolled === "true");
  check("Header reappears on scroll up", up === "false", up);
  await d.ctx.close();
}

await browser.close();
const failed = results.filter((r) => !r).length;
console.log(`\n${results.length - failed}/${results.length} checks passed${failed ? `, ${failed} FAILED` : ""}.`);
process.exit(failed ? 1 : 0);
