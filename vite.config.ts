import { fileURLToPath, URL } from "node:url";
import { reactRouter } from "@react-router/dev/vite";
import { paraglide } from "@inlang/paraglide-vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const appDir = fileURLToPath(new URL("./app", import.meta.url));

export default defineConfig({
  resolve: {
    alias: { "~": appDir },
  },
  plugins: [
    paraglide({
      project: "./project.inlang",
      outdir: "./app/paraglide",
    }),
    tailwindcss(),
    reactRouter(),
  ],
  server: {
    port: 3000,
  },
  ssr: {
    noExternal: ["@auth/core"],
  },
});
