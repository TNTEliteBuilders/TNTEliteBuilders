import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Dev server on 8080. 8443 is reserved (PragOptics) and must not be used.
export default defineConfig({
  plugins: [react()],
  server: { port: 8080 }
});
