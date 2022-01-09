module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'kagura', 'prettier'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'comma-dangle': ['error', 'never']
  }
}
