import plugin from "tailwindcss/plugin";
import daisyui from "daisyui";
import { light } from "daisyui/src/theming/themes";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          ...light,
          // secondary: "#f3f4f6",
        },
      },
    ],
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("children", "&>*");
    }),
    daisyui,
  ],
};
