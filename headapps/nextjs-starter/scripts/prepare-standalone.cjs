const fs = require("fs");
const path = require("path");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(s, d);
    } else if (entry.isFile()) {
      ensureDir(path.dirname(d));
      fs.copyFileSync(s, d);
    }
  }
}

const root = process.cwd();
const standaloneRoot = path.join(root, ".next", "standalone");
const standaloneNextDir = path.join(standaloneRoot, ".next");

// Copy .next/static => .next/standalone/.next/static
copyDir(
  path.join(root, ".next", "static"),
  path.join(standaloneNextDir, "static")
);

// Copy public => .next/standalone/public (if exists)
copyDir(path.join(root, "public"), path.join(standaloneRoot, "public"));

console.log(
  "[prepare-standalone] copied static and public assets into .next/standalone"
);
