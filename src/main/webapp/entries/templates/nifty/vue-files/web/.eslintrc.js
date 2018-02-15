// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  globals: {
    "$": true,
    "jQuery": true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    'semi': 'off',
    'no-tabs': 'off',
    'semi': 'off',
    'indent': 'off',
    'quotes': 'off',
    'space-before-function-paren': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'no-trailing-spaces': 'off',
    'comma-dangle': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
