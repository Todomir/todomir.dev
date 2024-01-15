module.exports = {
  ...require("@todomir/prettier-config"),
  plugins: [
    ...require("@todomir/prettier-config").plugins,
    "prettier-plugin-tailwindcss",
  ],
};
