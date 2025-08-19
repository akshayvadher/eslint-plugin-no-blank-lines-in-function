# ESLint Plugin: No Blank Lines in Functions

An ESLint plugin that prevents blank lines inside function bodies to maintain compact, readable code.

## Installation

```bash
npm install eslint-plugin-no-function-blank-lines --save-dev
```

## Usage

Add the plugin to your `.eslintrc` configuration:

```json
{
  "plugins": ["no-function-blank-lines"],
  "rules": {
    "no-function-blank-lines/no-blank-lines-in-function": "error"
  }
}
```

## Rule Details

This rule disallows blank lines inside function bodies for:
- Function declarations
- Function expressions
- Arrow functions
- Class methods

### ❌ Incorrect

```javascript
function example() {
  const a = 1;
  
  const b = 2;
  
  return a + b;
}
```

### ✅ Correct

```javascript
function example() {
  const a = 1;
  const b = 2;
  return a + b;
}
```

## Auto-fixing

This rule supports ESLint's `--fix` option to automatically remove blank lines inside functions.

## License

MIT
