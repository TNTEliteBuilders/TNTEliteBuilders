// Derive sitemap.xml from the built dist tree: one entry per index.html.
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { resolve, join, relative } from "node:path";

const SITE = "https://tntelitebuilders.com";
const dist = resolve("dist");
const today = new Date().toISOString().slice(0, 10);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === "server") continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (name === "index.html") out.push(full);
  }
  return out;
}

const urls = walk(dist).map((file) => {
  const rel = relative(dist, file).replace(/\\/g, "/").replace(/index\.html$/, "");
  const loc = SITE + "/" + rel;
  const priority = rel === "" ? "1.0" : "0.7";
  return { loc: loc.replace(/\/+$/, "/"), priority };
});

const body =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n` +
        `    <changefreq>weekly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
    )
    .join("\n") +
  `\n</urlset>\n`;

writeFileSync(resolve(dist, "sitemap.xml"), body);
console.log("sitemap:", urls.length, "urls");
