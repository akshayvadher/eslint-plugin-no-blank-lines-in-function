import { RuleTester } from "eslint";
import plugin from "../src/index";

RuleTester.setDefaultConfig({
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
});

const ruleTester = new RuleTester();

const validCases = [
  {
    name: "function declarations without blank lines",
    code: `function test() {
        const a = 1;
        const b = 2;
        return a + b;
      }`,
  },
  {
    name: "arrow functions without blank lines",
    code: `const test = () => {
        console.log('start');
        console.log('end');
      };`,
  },
  {
    name: "function expressions without blank lines",
    code: `const test = function() {
        const x = 1;
        return x * 2;
      };`,
  },
  {
    name: "class methods without blank lines",
    code: `class TestClass {
        method() {
          const value = 42;
          return value;
        }
      }`,
  },
  {
    name: "empty functions",
    code: `function empty() {}`,
  },
  {
    name: "functions with only one statement",
    code: `function single() {
        return true;
      }`,
  },
  {
    name: "functions with comments but no blank lines",
    code: `function withComments() {
        // This is a comment
        const a = 1;
        /* Block comment */
        return a;
      }`,
  },
  {
    name: "nested functions without blank lines",
    code: `function outer() {
        function inner() {
          return 42;
        }
        return inner();
      }`,
  },
  {
    name: "arrow functions with single expressions",
    code: `const arrow = () => 42;`,
  },
  {
    name: "object methods without blank lines",
    code: `const obj = {
        method() {
          const a = 1;
          return a;
        }
      };`,
  },
];

const invalidCases = [
  {
    name: "blank lines in function declarations",
    code: `function test() {
        const a = 1;

        const b = 2;
        return a + b;
      }`,
    errors: [{ messageId: "unexpectedBlankLine", type: "BlockStatement" }],
    output: `function test() {
        const a = 1;
        const b = 2;
        return a + b;
      }`,
  },
  {
    name: "blank lines in arrow functions",
    code: `const test = () => {
        console.log('start');

        console.log('end');
      };`,
    errors: [{ messageId: "unexpectedBlankLine", type: "BlockStatement" }],
    output: `const test = () => {
        console.log('start');
        console.log('end');
      };`,
  },
  {
    name: "blank lines in function expressions",
    code: `const test = function() {
        const x = 1;

        return x * 2;
      };`,
    errors: [{ messageId: "unexpectedBlankLine", type: "BlockStatement" }],
    output: `const test = function() {
        const x = 1;
        return x * 2;
      };`,
  },
  {
    name: "blank lines in class methods",
    code: `class TestClass {
        method() {
          const value = 42;

          return value;
        }
      }`,
    errors: [{ messageId: "unexpectedBlankLine", type: "BlockStatement" }],
    output: `class TestClass {
        method() {
          const value = 42;
          return value;
        }
      }`,
  },
  {
    name: "multiple blank lines in functions",
    code: `function multipleBlankLines() {
        const a = 1;


        const b = 2;

        return a + b;
      }`,
    errors: [{ messageId: "unexpectedBlankLine", type: "BlockStatement" }],
    output: `function multipleBlankLines() {
        const a = 1;
        const b = 2;
        return a + b;
      }`,
  },
  {
    name: "blank lines in async functions",
    code: `async function asyncTest() {
        const data = await fetchData();

        return data.value;
      }`,
    errors: [{ messageId: "unexpectedBlankLine", type: "BlockStatement" }],
    output: `async function asyncTest() {
        const data = await fetchData();
        return data.value;
      }`,
  },
  {
    name: "blank lines in generator functions",
    code: `function* generator() {
        yield 1;

        yield 2;
      }`,
    errors: [{ messageId: "unexpectedBlankLine", type: "BlockStatement" }],
    output: `function* generator() {
        yield 1;
        yield 2;
      }`,
  },
  {
    name: "blank lines in constructor methods",
    code: `class MyClass {
        constructor() {
          this.value = 1;

          this.name = 'test';
        }
      }`,
    errors: [{ messageId: "unexpectedBlankLine", type: "BlockStatement" }],
    output: `class MyClass {
        constructor() {
          this.value = 1;
          this.name = 'test';
        }
      }`,
  },
  {
    name: "blank lines in static methods",
    code: `class MyClass {
        static staticMethod() {
          const result = calculate();

          return result;
        }
      }`,
    errors: [{ messageId: "unexpectedBlankLine", type: "BlockStatement" }],
    output: `class MyClass {
        static staticMethod() {
          const result = calculate();
          return result;
        }
      }`,
  },
  {
    name: "blank lines with comments",
    code: `function withCommentsAndBlankLine() {
        // Comment before
        const a = 1;

        // Comment after blank line
        return a;
      }`,
    errors: [{ messageId: "unexpectedBlankLine", type: "BlockStatement" }],
    output: `function withCommentsAndBlankLine() {
        // Comment before
        const a = 1;
        // Comment after blank line
        return a;
      }`,
  },
  {
    name: "blank lines in outer nested functions",
    code: `function outer() {
        const x = 1;

        function inner() {
          return 42;
        }
        return inner();
      }`,
    errors: [{ messageId: "unexpectedBlankLine", type: "BlockStatement" }],
    output: `function outer() {
        const x = 1;
        function inner() {
          return 42;
        }
        return inner();
      }`,
  },
  {
    name: "blank lines in inner nested functions",
    code: `function outer() {
        function inner() {
          const a = 1;

          return a;
        }
        return inner();
      }`,
    errors: [
      { messageId: "unexpectedBlankLine", type: "BlockStatement" },
      { messageId: "unexpectedBlankLine", type: "BlockStatement" },
    ],
    output: `function outer() {
        function inner() {
          const a = 1;
          return a;
        }
        return inner();
      }`,
  },
  {
    name: "blank lines in object methods",
    code: `const obj = {
        method() {
          const a = 1;

          return a;
        }
      };`,
    errors: [{ messageId: "unexpectedBlankLine", type: "BlockStatement" }],
    output: `const obj = {
        method() {
          const a = 1;
          return a;
        }
      };`,
  },
];

ruleTester.run(
  "no-blank-lines-in-function",
  plugin.rules["no-blank-lines-in-function"],
  {
    valid: validCases.map(({ code }) => code),
    invalid: invalidCases.map(({ code, errors, output }) => ({
      code,
      errors,
      output,
    })),
  },
);
