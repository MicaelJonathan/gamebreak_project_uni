/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // O novo plugin que você acabou de instalar
    autoprefixer: {},
  },
};

export default config;