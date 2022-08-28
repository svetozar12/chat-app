module.exports = {
  extends: 'stylelint-config-standard',

  plugins: ['stylelint-order', 'stylelint-scss'],

  rules: {
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'string-quotes': 'single',
    'order/order': ['custom-properties', 'dollar-variables', 'declarations', 'at-rules', 'rules'],
    'order/properties-order': [],
    'no-empty-source': null,
    'comment-empty-line-before': null,
    'declaration-block-trailing-semicolon': null,
    'declaration-colon-space-after': null,
    'property-no-unknown': null,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'selector-class-pattern': '^[a-z][a-zA-Z0-9]+$',
  },
};
