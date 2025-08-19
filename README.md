# eslint-plugin-no-blank-lines-in-function

An ESLint plugin that prevents blank lines inside function bodies to maintain compact, readable code.

## Installation

```bash
npm install eslint-plugin-no-blank-lines-in-function --save-dev
```

## Usage

Add the plugin to your `.eslintrc` configuration:

```json
{
  "plugins": ["no-blank-lines-in-function"],
  "rules": {
    "no-blank-lines-in-function/no-blank-lines-in-function": "error"
  }
}
```

## Rule Details

This rule disallows blank lines inside function bodies for:
- Function declarations
- Function expressions
- Arrow functions
- Class methods

### Examples

**Incorrect:**

```javascript
function example() {
  const a = 1;
  
  const b = 2;
  
  return a + b;
}
```

**Correct:**

```javascript
function example() {
  const a = 1;
  const b = 2;
  return a + b;
}
```

## Auto-fixing

This rule supports ESLint's `--fix` option to automatically remove blank lines inside functions.

```bash
eslint --fix your-file.js
```

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## License

MIT - feel free to use this however you want.
