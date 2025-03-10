const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'prettier',
    'import',
    // 'vitest',
    'eslint-plugin-no-inline-styles',
    'jasmine',
  ],
  extends: [
    'next',
    'next/core-web-vitals',
    'eslint-config-next',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/warnings',
    'plugin:jasmine/recommended',
    // 'plugin:vitest/recommended',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? ERROR : WARNING,
    'no-eval': ERROR,
    'no-debugger': ERROR,
    'no-nested-ternary': ERROR,
    'max-params': [ERROR, 3],
    'object-shorthand': ERROR,
    'no-inline-styles/no-inline-styles': ERROR,
    'prettier/prettier': [ERROR],
    'react-hooks/rules-of-hooks': ERROR,
    'react-hooks/exhaustive-deps': ERROR,
    curly: ['error', 'all'],
    quotes: [ERROR, 'single', { avoidEscape: true }],
    '@typescript-eslint/no-inferrable-types': ERROR,
    '@typescript-eslint/typedef': OFF,
    // 'import/prefer-default-export': ERROR,
    'import/no-duplicates': ERROR,
    'import/no-named-as-default': OFF,
  },
  overrides: [
    {
      files: ['**/*.ts'],
      rules: {
        'import/prefer-default-export': OFF,
      },
    },
    {
      files: ['**/*.test.tsx', '**/*.test.ts'],
      rules: {
        '@typescript-eslint/typedef': OFF,
        // 'vitest/prefer-called-with': [ERROR],
        // 'vitest/consistent-test-it': ERROR,
        // 'vitest/max-expects': [ERROR, { max: 2 }],
        // 'vitest/no-disabled-tests': ERROR,
        // 'vitest/no-focused-tests': ERROR,
        // 'vitest/prefer-hooks-in-order': ERROR,
        // 'vitest/prefer-hooks-on-top': ERROR,
        // 'vitest/prefer-lowercase-title': [
        //   ERROR,
        //   {
        //     ignore: ['describe'],
        //   },
        // ],
        'jasmine/new-line-between-declarations': ERROR,
        'jasmine/new-line-before-expect': ERROR,
        'jasmine/expect-matcher': ERROR,
        'jasmine/no-suite-dupes': [ERROR, 'branch'],
        'jasmine/no-spec-dupes': [ERROR, 'branch'],
      },
    },
  ],
};
