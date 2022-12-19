module.exports = {
  defaultSeverity: 'error',
  extends: [
    'stylelint-config-prettier',
    'stylelint-config-recess-order',
    'stylelint-config-standard-scss',
    // 'stylelint-config-recommended-vue',
    'stylelint-config-recommended-vue/scss',
    // 'stylelint-config-standard-vue/scss',
  ],
  plugins: [
    'stylelint-scss',
    'stylelint-order'
  ],
  overrides: [
    {
      'files': ['**/*.scss'],
      'customSyntax': 'postcss-scss'
    }
  ],
  rules: {
  }
}
