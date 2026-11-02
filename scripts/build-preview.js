// Run with the same Node runtime as the normal production build.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { execFileSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const preview = path.join(root, ".preview");
const metadata = path.join(preview, "release.json");
fs.mkdirSync(preview, { recursive: true });
const name = fs.existsSync(metadata)
  ? JSON.parse(fs.readFileSync(metadata, "utf8")).name
  : `preview-${crypto.randomBytes(16).toString("hex")}`;
if (!/^preview-[a-f0-9]{32}$/.test(name)) throw new Error("Invalid preview directory name");
const basePath = `/${name}`;
const env = { ...process.env, NEXT_PUBLIC_SITE_BASE_PATH: basePath };
const next = require.resolve("next/dist/bin/next");
execFileSync(process.execPath, [next, "build"], { cwd: root, env, stdio: "inherit" });
execFileSync(process.execPath, [next, "export", "-o", ".preview/site"], { cwd: root, env, stdio: "inherit" });

fs.writeFileSync(path.join(preview, "site", "robots.txt"),
  "# Preview only. Standard crawlers read robots.txt at the domain root.\n" +
  "# Indexing is disabled by page metadata and X-Robots-Tag headers.\n" +
  "User-agent: *\nDisallow: /\n");
fs.writeFileSync(path.join(preview, "site", ".htaccess"),
  "Options -Indexes\nDirectoryIndex index.html\n" +
  `ErrorDocument 404 ${basePath}/404.html\n` +
  '<IfModule mod_headers.c>\n' +
  '  Header always set X-Robots-Tag "noindex, nofollow, noarchive"\n' +
  '  Header always set Referrer-Policy "no-referrer"\n' +
  '  Header always set Cache-Control "no-store"\n' +
  '</IfModule>\n');
fs.writeFileSync(metadata, JSON.stringify({ name, basePath, builtAt: new Date().toISOString() }, null, 2) + "\n");
console.log(`Preview export: .preview/site (base path ${basePath})`);
