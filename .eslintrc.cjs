// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,

  parserOptions: {
    parser: "@typescript-eslint/parser",
  },

  globals: {
    Vue: "readonly",
  },

  env: {
    browser: true,
  },

  extends: ["airbnb", "plugin:vue/vue3-recommended", "prettier"],

  // required to lint *.vue files
  plugins: ["vue", "import", "decorator-position", "prettier"],

  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./",
      },
    },
  },

  // add your custom rules here
  rules: {
    "prettier/prettier": ["error"],
    "vetur.validation.template": false,
    "vue-scoped-css/enforce-style-type": ["error", { allows: ["scoped"] }],
    "import/no-unresolved": "error",
    "import/order": [
      "error",
      {
        pathGroups: [
          { pattern: "test/**", group: "internal", position: "after" },
          { pattern: "@/**", group: "internal", position: "after" },
        ],
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        alphabetize: { order: "asc" },
        "newlines-between": "always",
      },
    ],
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/ban-ts-comment": ["warn"],
    "@typescript-eslint/explicit-function-return-type": ["warn"],
    "@typescript-eslint/no-explicit-any": ["warn"],
    "@typescript-eslint/no-use-before-define": ["error"],
    "@typescript-eslint/no-unused-vars": [
      "error",
      { ignoreRestSiblings: true },
    ],
    "@typescript-eslint/no-implicit-any-catch": ["error"],
    "brace-style": ["error", "1tbs", { allowSingleLine: true }],
    // allow async-await
    "generator-star-spacing": "off",
    // typescript resolver reports errors for aliased imports when using import/no-relative-imports
    // so this is a workaround
    "no-restricted-imports": ["error", { patterns: ["..*"] }],
    "no-console": ["error", { allow: ["warn", "error", "info"] }],
    "no-debugger": "error",
    // when using typescript, this is recommended to be off
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
    "no-undef": "off",
    // when using typescript, this is the recommended approach
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md#disallow-the-use-of-variables-before-they-are-defined-no-use-before-define
    "no-use-before-define": "off",
    // forces to wrap statements and return types into curly braces
    // https://eslint.org/docs/rules/curly
    curly: ["error", "all"],
    "require-await": ["error"],
    semi: ["error", "never"],
    "vue/one-component-per-file": "off",
    "vue/no-v-html": "off",
    indent: ["error", 2],
    "max-len": [
      "warn",
      {
        code: 100,
        comments: 100,
        ignorePattern: "^import [a-zA-Z].*",
      },
    ],
    "decorator-position/decorator-position": [
      "error",
      {
        properties: "above",
        methods: "above",
      },
    ],
    "vue/max-attributes-per-line": "off",
  },

  overrides: [
    {
      files: ["config/**/*.*"],
      rules: {
        "import/order": [
          "warn",
          {
            pathGroups: [
              { pattern: "test/**", group: "internal", position: "after" },
              { pattern: "@/**", group: "internal", position: "after" },
            ],
            groups: [
              "builtin",
              "external",
              "internal",
              "parent",
              "sibling",
              "index",
              "object",
              "type",
            ],
            alphabetize: { order: "asc" },
            "newlines-between": "always",
          },
        ],
      },
    },
    {
      files: ["**/*.stories.ts"],
      rules: {
        // stories get indentation rules errors, mainly due to using backticks for
        // templating. We should look into using .tsx for stories instead
        indent: "off",
        "import/order": [
          "warn",
          {
            pathGroups: [
              { pattern: "test/**", group: "internal", position: "after" },
              { pattern: "@/**", group: "internal", position: "after" },
            ],
            groups: [
              "builtin",
              "external",
              "internal",
              "parent",
              "sibling",
              "index",
              "object",
              "type",
            ],
            alphabetize: { order: "asc" },
            "newlines-between": "always",
          },
        ],
      },
    },
    {
      files: ["test/**/*.*"],
      rules: {
        "@typescript-eslint/no-implicit-any-catch": ["warn"],
        "@typescript-eslint/no-explicit-any": ["warn"],
        "@typescript-eslint/explicit-function-return-type": ["warn"],
        "max-len": [
          "warn",
          {
            code: 100,
            comments: 100,
            ignorePattern: "^import [a-zA-Z].*",
          },
        ],
      },
    },
  ],
};
