import { defineConfig, loadEnv, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log("VITE MODE:", mode);
  return {
    plugins: [
      react(),
      svgr(),
      tailwindcss(),
      mode === "analyze" &&
        (visualizer({ filename: "stats.html", open: true }) as PluginOption),
    ],
    base: env.VITE_BASE_PATH || "/",
  };
});
