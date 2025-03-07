import js from '@eslint/js';
import react from 'eslint-plugin-react';
import globals from 'globals';


export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    ignores: ["out/", "dist/", "node_modules/", "src/styles/"],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react
    },
    rules: {
      "eqeqeq": "off", // === and !== rule,
      "react-hooks/exhaustive-deps": "off", // React Hook useEffect missing dependencies
      "array-callback-return": "off",       // map() expects a return value
      "react/jsx-no-target-blank": "off",    // Using target="_blank" without rel="noreferrer"
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
    },
  },
];