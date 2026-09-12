// Prerender each route to static HTML: render the app, inject the head block,
// and drop the markup into the built template. Output is dist/<route>/index.html.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { pathToFileURL } from "node:url";

const dist = resolve("dist");
const server = pathToFileURL(resolve(dist, "server/entry-server.js")).href;
const { render, PRERENDER_ROUTES, headFor, headTags } = await import(server);

const template = readFileSync(resolve(dist, "index.html"), "utf8");

function pageFor(route) {
  const appHtml = render(route);
  const head = headTags(headFor(route));
  return template
    .replace("<title>TNT Elite Builders</title>", head)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

for (const route of PRERENDER_ROUTES) {
  const html = pageFor(route);
  const outDir = route === "/" ? dist : resolve(dist, "." + route);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, "index.html"), html);
  console.log("prerendered", route);
}

// SPA fallback for unknown paths (GitHub Pages serves it with a 404 status).
const notFound = template
  .replace(
    "<title>TNT Elite Builders</title>",
    '<title>404 — TNT Elite Builders</title>\n    <meta name="robots" content="noindex" />'
  );
writeFileSync(resolve(dist, "404.html"), notFound);
console.log("wrote 404.html");
