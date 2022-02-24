module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-prettier"],

  rules: {
    "property-no-unknown": [
      true,
      {
        ignoreProperties: ["composes"],
      },
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global"],
      },
    ],
    "string-quotes": "double",
    "no-empty-source": null,
    "comment-empty-line-before": null,
    "declaration-block-trailing-semicolon": null,
    "declaration-colon-space-after": null,
    "at-rule-no-unknown": null,
  },
};
