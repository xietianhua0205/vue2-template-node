module.exports = {
  defaultSeverity: 'error',
  extends: [
    'stylelint-config-prettier',
    'stylelint-config-recess-order',
    'stylelint-config-standard',
    'stylelint-config-recommended-less'
  ],
  plugins: [
    'stylelint-less',
    'stylelint-order'
  ],
  overrides: [
    {
      'files': ['**/*.less'],
      'customSyntax': 'postcss-less'
    }
  ],
  rules: {
  }
}
