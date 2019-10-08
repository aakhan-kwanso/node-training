module.exports = {
  parserOptions: {
    sourceType: "module"
  },
  parser: "babel-eslint",
  env: {
    node: true
  },
  extends: ["prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        semi: true
      }
    ]
  }
};
