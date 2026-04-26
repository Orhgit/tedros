import { reactRouter } from "@react-router/dev/vite";
import { paraglide } from "@inlang/paraglide-vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    paraglide({
      project: "./project.inlang",
      outdir: "./app/paraglide",
    }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
  server: {
    port: 3000,
  },
  ssr: {
    noExternal: ["@auth/core"],
  },
});
