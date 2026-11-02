const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const root = path.resolve(__dirname, "..");
const env = { ...process.env, NEXT_PUBLIC_SITE_BASE_PATH: "" };
const next = require.resolve("next/dist/bin/next");
// A separate build directory keeps stale dev/preview bundles out of releases.
env.PERSONAL_RELEASE_BUILD = "1";
execFileSync(process.execPath, [next, "build"], { cwd: root, env, stdio: "inherit" });
execFileSync(process.execPath, [next, "export"], { cwd: root, env, stdio: "inherit" });
for (const file of ["index.html", "404.html"]) {
  const html = fs.readFileSync(path.join(root, "out", file), "utf8");
  if (/noindex|preview-[a-f0-9]{32}/.test(html)) throw new Error(`Preview configuration found in ${file}`);
}
console.log("Production export ready in out/ (root URLs, no preview indexing restrictions).");
