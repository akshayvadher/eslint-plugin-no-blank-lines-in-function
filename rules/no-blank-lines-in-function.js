/**
 * @fileoverview Rule to disallow blank lines inside function bodies
 * @author Akshay Vadher
 */

export default {
  meta: {
    type: "layout",
    docs: {
      description: "disallow blank lines inside function bodies",
      category: "Stylistic Issues",
      recommended: false,
      url: "https://github.com/akshayvadher/eslint-plugin-no-blank-lines-in-function#readme",
    },
    fixable: "whitespace",
    schema: [],
    messages: {
      unexpectedBlankLine: "Unexpected blank line inside function body.",
    },
  },

  create(context) {
    const sourceCode = context.getSourceCode();
    const processedRanges = new Set(); // Track processed ranges to avoid duplicates

    /**
     * Check if a function node has blank lines in its body
     * @param {Object} node - The function node
     */
    function checkFunction(node) {
      if (!node.body || node.body.type !== "BlockStatement") {
        return;
      }

      const functionBody = node.body;
      const rangeKey = `${functionBody.range[0]}-${functionBody.range[1]}`;

      // Avoid processing the same function body multiple times
      if (processedRanges.has(rangeKey)) {
        return;
      }
      processedRanges.add(rangeKey);

      const lines = sourceCode.lines;
      const startLine = functionBody.loc.start.line;
      const endLine = functionBody.loc.end.line;

      // Check each line within the function body (excluding braces)
      // Collect all blank line ranges inside the function body
      const blankLineNumbers = [];
      for (let lineNum = startLine + 1; lineNum < endLine; lineNum++) {
        const line = lines[lineNum - 1];
        if (line.trim() === "") {
          blankLineNumbers.push(lineNum);
        }
      }
      if (blankLineNumbers.length > 0) {
        // Only report once per function body, but fix all blank lines at once
        context.report({
          node: functionBody,
          loc: {
            start: { line: blankLineNumbers[0], column: 0 },
            end: { line: blankLineNumbers[0], column: 0 },
          },
          messageId: "unexpectedBlankLine",
          fix(fixer) {
            // Remove all blank lines in the function body
            const fixes = blankLineNumbers.map(lineNum => {
              const startOfLine = sourceCode.getIndexFromLoc({ line: lineNum, column: 0 });
              const endOfLine = sourceCode.getIndexFromLoc({ line: lineNum + 1, column: 0 });
              return fixer.removeRange([startOfLine, endOfLine]);
            });
            return fixes;
          },
        });
      }
    }

    return {
      FunctionDeclaration: checkFunction,
      FunctionExpression: checkFunction,
      ArrowFunctionExpression: checkFunction,
      MethodDefinition(node) {
        if (
          node.value &&
          (node.value.type === "FunctionExpression" ||
            node.value.type === "ArrowFunctionExpression")
        ) {
          checkFunction(node.value);
        }
      },
    };
  },
};
