// Builds Tailwind for both `next dev --webpack` and Turbopack.
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
