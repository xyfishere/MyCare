const fs = require("fs");
const path = require("path");
const Module = require("module");

const browserPluginNodeModules = path.join(
  process.env.USERPROFILE || "",
  ".cache",
  "codex-runtimes",
  "codex-primary-runtime",
  "dependencies",
  "node",
  "node_modules",
  ".pnpm",
  "playwright@1.61.1",
  "node_modules",
  "playwright",
);

const localRequire = Module.createRequire(path.join(browserPluginNodeModules, "package.json"));
const { chromium } = localRequire("playwright");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "tmp-responsive-audit");
const reportPath = path.join(outDir, "report.json");
fs.mkdirSync(outDir, { recursive: true });

const sizes = [
  { name: "phone", width: 390, height: 844, isMobile: true },
  { name: "ipad", width: 768, height: 1024 },
  { name: "ipad-landscape", width: 1024, height: 768 },
];

const views = [
  { name: "home", view: "home" },
  { name: "work", view: "work" },
  { name: "work-family", view: "work", scope: "family" },
  { name: "focus", view: "focus" },
  { name: "morning", view: "morning" },
  { name: "night", view: "night" },
  { name: "stats", view: "stats" },
  { name: "stats-family", view: "stats", scope: "family" },
  { name: "habits", view: "habits" },
  { name: "block", view: "block" },
];

function safeName(value) {
  return String(value).replace(/[^a-z0-9-]/gi, "-").toLowerCase();
}

(async () => {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const page = await browser.newPage();
  const reports = [];

  for (const size of sizes) {
    await page.setViewportSize({ width: size.width, height: size.height });
    await page.goto("http://127.0.0.1:4174/", { waitUntil: "networkidle" });

    for (const target of views) {
      await page.evaluate((targetView) => {
        const button = targetView === "home"
          ? document.querySelector("[data-view='home']")
          : document.querySelector(`[data-view='${targetView}']`);
        if (button) button.click();
      }, target.view);
      await page.waitForTimeout(450);

      if (target.scope) {
        await page.evaluate((targetScope) => {
          const button = document.querySelector(`[data-goal-scope='${targetScope}'], [data-stats-scope='${targetScope}']`);
          if (button) button.click();
        }, target.scope);
        await page.waitForTimeout(450);
      }

      const report = await page.evaluate((targetView) => {
        const active = document.querySelector(".view.active");
        const documentWidth = document.documentElement.scrollWidth;
        const viewportWidth = window.innerWidth;
        const wideElements = [...document.querySelectorAll("body *")]
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return {
              tag: element.tagName,
              id: element.id,
              className: String(element.className || "").slice(0, 100),
              text: String(element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 70),
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              top: Math.round(rect.top),
              width: Math.round(rect.width),
              height: Math.round(rect.height),
            };
          })
          .filter((item) => item.width > 0 && (item.left < -2 || item.right > viewportWidth + 2))
          .slice(0, 20);

        const activeRect = active?.getBoundingClientRect();
        return {
          view: targetView,
          viewportWidth,
          viewportHeight: window.innerHeight,
          documentWidth,
          horizontalOverflow: documentWidth > viewportWidth + 2,
          bodyClasses: document.body.className,
          activeRect: activeRect ? {
            left: Math.round(activeRect.left),
            top: Math.round(activeRect.top),
            width: Math.round(activeRect.width),
            height: Math.round(activeRect.height),
          } : null,
          wideElements,
        };
      }, target.name);

      reports.push({ size: size.name, ...report });
      fs.writeFileSync(reportPath, JSON.stringify(reports, null, 2));
      await page.screenshot({
        path: path.join(outDir, `${safeName(size.name)}-${safeName(target.name)}.png`),
        fullPage: false,
      });
    }
  }

  await browser.close();
  fs.writeFileSync(reportPath, JSON.stringify(reports, null, 2));
  console.log(reportPath);
})();
