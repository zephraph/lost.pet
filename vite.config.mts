import { defineConfig } from "vite";
import { redwood } from "@redwoodjs/sdk/vite";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  environments: {
    ssr: {}
  },
  plugins: [redwood(), tailwindcss()],
});
