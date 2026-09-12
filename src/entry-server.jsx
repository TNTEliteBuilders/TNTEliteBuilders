import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App.jsx";

// One import feeds both the SSR render and the prerenderer.
export { PRERENDER_ROUTES, headFor, headTags } from "./seo.js";

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}
