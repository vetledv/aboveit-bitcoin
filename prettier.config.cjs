/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  trailingComma: 'es5',
  semi: false,
  singleQuote: true,
  bracketSameLine: true,
}
