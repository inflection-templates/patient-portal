export default {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
	rules: {
		indent: ['error', 4], // Enforce 4-space indentation
		semi: ['error', 'always'], // Require semicolons
		quotes: ['error', 'single', { avoidEscape: true }], // Use single quotes
		'object-curly-spacing': ['error', 'always'], // Require spaces inside object braces
		'comma-dangle': ['error', 'always-multiline'], // Require trailing commas in multiline lists
		'arrow-parens': ['error', 'always'], // Require parentheses in arrow functions
		'no-trailing-spaces': ['error'], // Disallow trailing spaces
		'max-len': ['warn', { code: 120 }], // Warn if a line exceeds 120 characters
		'no-multiple-empty-lines': ['error', { max: 1 }], // Allow only one empty line
		'key-spacing': ['error', { beforeColon: false, afterColon: true }] // Enforce spaces after colons in objects
	}
};
