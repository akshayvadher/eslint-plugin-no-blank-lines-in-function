/**
 * @fileoverview ESLint plugin to prevent blank lines inside function bodies
 * @author Akshay Vadher
 */

import noBlankLinesInFunction from "./rules/no-blank-lines-in-function.js";

const plugin = {
  meta: {
    name: "eslint-plugin-no-blank-lines-in-function",
    version: "1.0.0",
  },
  rules: {
    "no-blank-lines-in-function": noBlankLinesInFunction,
  },
  configs: {
    recommended: {
      plugins: ["no-blank-lines-in-function"],
      rules: {
        "no-blank-lines-in-function/no-blank-lines-in-function": "error",
      },
    },
  },
};

export default plugin;
