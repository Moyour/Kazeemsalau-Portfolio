import type { Config } from "tailwindcss";

export default {
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'ks-outer': '#E8E4D9',
        'ks-paper': '#F4F1EA',
        'ks-dark': '#14120F',
        'ks-body': '#3A362F',
        'ks-muted': '#5F5A50',
        'ks-accent': '#C0281B',
        'ks-border': '#CFC9BB',
        'ks-footer': '#14120F',
        'ks-footer-text': '#E7E3DA',
        'ks-footer-muted': '#9C968C',
      },
      fontFamily: {
        archivo: ['Archivo', 'sans-serif'],
        newsreader: ['Newsreader', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
