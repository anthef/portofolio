import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        well: "var(--well)",
        surface: "var(--surface)",
        raised: "var(--raised)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        ink: "var(--ink)",
        text: "var(--text)",
        muted: "var(--muted)",
        faint: "var(--faint)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        "series-2": "var(--series-2)",
        "series-3": "var(--series-3)",
        live: "var(--live)",
        inverse: "var(--inverse)",
        "on-inverse": "var(--on-inverse)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        display: ["var(--font-geist-pixel-line)", "var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        frame: "1240px",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        ping: {
          "75%, 100%": { transform: "scale(2.4)", opacity: "0" },
        },
        rise: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        blink: "blink 1.1s step-end infinite",
        ping: "ping 1.6s cubic-bezier(0, 0, 0.2, 1) infinite",
        rise: "rise 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both",
        float: "float 6s ease-in-out infinite",
        orbit: "spin 40s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
