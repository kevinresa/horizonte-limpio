import { defineConfig } from "tailwindcss";

export default defineConfig({
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        }
      },
      animation: {
        fadeUp: "fadeUp 0.7s ease-out forwards",
      }
    },
  },
  plugins: [],
});
