module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    "react",
    "unused-imports",
    "no-relative-import-paths",
    "import",
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "quotes": ["error", "single"],
    "semi": ["error", "never"],
    "no-trailing-spaces": ["error"],
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "no-multiple-empty-lines": ["error", { "max": 1 } ],
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline"
    }],
    "object-curly-spacing": ["error", "always"],
    "space-before-blocks": ["error", { "functions": "always", "keywords": "always", "classes": "always" }],
    "space-before-function-paren": ["error", {"anonymous": "never", "named": "never", "asyncArrow": "always"}],
    "no-multi-spaces": ["error"],
    "eol-last": ["error", "always"],
    "unused-imports/no-unused-imports": "error",
    'no-unused-vars': 'warn',
    "react/jsx-max-props-per-line": ["error", { "maximum": 1 }],
    "react/jsx-sort-props": ["warn", {
      "callbacksLast": true,
      "shorthandLast": true,
      "noSortAlphabetically": true,
      "reservedFirst": true
    }],
    "react/jsx-boolean-value": ["error", "never"],
    "react/jsx-closing-bracket-location": ["error"],
    "react/jsx-closing-tag-location": ["error"],
    "no-relative-import-paths/no-relative-import-paths": [
      "warn",
      { "allowSameFolder": true, "rootDir": "src" }
    ],
    "import/order": ["error", {
      "newlines-between": "never",
      "groups": [
        "builtin",
        "external",
        "internal",
        "parent",
        "sibling",
        "index"
      ],
      "pathGroupsExcludedImportTypes": [],
      "pathGroups": [
        {
          "pattern": "react*",
          "group": "builtin",
          "position": "after"
        },
        {
          "pattern": "react*/**",
          "group": "external",
          "position": "before"
        },
        {
          "pattern": "+(App|api|components|consts|data|features|hooks|pages|services|store|types|helpers)*/**",
          "group": "index",
          "position": "after"
        },
        {
          "pattern": "+(App|api|components|consts|data|features|hooks|pages|services|store|types|helpers)*",
          "group": "index",
          "position": "after"
        }
      ],
      "alphabetize": {
        "order": "asc",
        "caseInsensitive": true,
      }
    }]
  },
}
