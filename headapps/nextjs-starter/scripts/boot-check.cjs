const fs = require("fs");
const path = require("path");

function log(name, value) {
  const masked = /SECRET|KEY|TOKEN/i.test(name) ? "***" : value;
  console.log(`[startup] ${name}: ${masked ?? ""}`);
}

console.log("[startup] Boot diagnostics starting");
log("node.version", process.version);

const envKeys = [
  "NEXT_PUBLIC_DEFAULT_SITE_NAME",
  "NEXT_PUBLIC_DEFAULT_LANGUAGE",
  "SITECORE_EDGE_URL",
  "SITECORE_EDGE_CONTEXT_ID",
  "NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID",
  "VERCEL_ENV",
];

for (const key of envKeys) {
  log(`env.${key}`, process.env[key]);
}

try {
  const sitesPath = path.resolve(process.cwd(), ".sitecore", "sites.json");
  if (fs.existsSync(sitesPath)) {
    const content = fs.readFileSync(sitesPath, "utf-8");
    const data = JSON.parse(content);
    const count = Array.isArray(data)
      ? data.length
      : Object.keys(data || {}).length;
    log("sites.status", "ok");
    log("sites.count", String(count));
  } else {
    log("sites.status", "missing");
  }
} catch (e) {
  console.error(
    "[startup] error reading .sitecore/sites.json",
    (e && e.message) || e
  );
}

try {
  const scModule = require(path.resolve(process.cwd(), "sitecore.config"));
  const scConfig = (scModule && (scModule.default || scModule)) || {};
  const keys = Object.keys(scConfig || {});
  log("sitecore.config.keys", keys.join(","));
  if (scConfig) {
    log("sitecore.config.defaultSite", scConfig.defaultSite);
    log("sitecore.config.defaultLanguage", scConfig.defaultLanguage);
  }
} catch (e) {
  console.error(
    "[startup] error loading sitecore.config",
    (e && e.message) || e
  );
}

console.log("[startup] Boot diagnostics completed");
