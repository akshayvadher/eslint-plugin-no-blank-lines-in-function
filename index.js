export default {
  rules: {
    'no-blank-lines-in-function': {
      meta: {
        type: 'layout',
        docs: {
          description: 'disallow blank lines inside function bodies',
          category: 'Stylistic Issues',
          recommended: false,
        },
        fixable: 'whitespace',
        schema: [],
        messages: {
          unexpectedBlankLine: 'Unexpected blank line inside function body.',
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
          if (!node.body || node.body.type !== 'BlockStatement') {
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
          for (let lineNum = startLine + 1; lineNum < endLine; lineNum++) {
            const line = lines[lineNum - 1]; // lines array is 0-indexed

            if (line.trim() === '') {
              // Check if this blank line has content before and after it
              let hasContentBefore = false;
              let hasContentAfter = false;

              // Check for content before
              for (let i = lineNum - 1; i > startLine; i--) {
                if (lines[i - 1].trim() !== '') {
                  hasContentBefore = true;
                  break;
                }
              }

              // Check for content after
              for (let i = lineNum + 1; i < endLine; i++) {
                if (lines[i - 1].trim() !== '') {
                  hasContentAfter = true;
                  break;
                }
              }

              if (hasContentBefore && hasContentAfter) {
                context.report({
                  node: functionBody,
                  loc: {
                    start: { line: lineNum, column: 0 },
                    end: { line: lineNum, column: line.length },
                  },
                  messageId: 'unexpectedBlankLine',
                  fix(fixer) {
                    // Calculate the range of the blank line
                    const startOfLine = sourceCode.getIndexFromLoc({
                      line: lineNum,
                      column: 0,
                    });
                    const endOfLine = sourceCode.getIndexFromLoc({
                      line: lineNum + 1,
                      column: 0,
                    });

                    // Remove the entire blank line including the newline
                    return fixer.removeRange([startOfLine, endOfLine]);
                  },
                });
              }
            }
          }
        }

        return {
          FunctionDeclaration: checkFunction,
          FunctionExpression: checkFunction,
          ArrowFunctionExpression: checkFunction,
          MethodDefinition(node) {
            if (node.value && (node.value.type === 'FunctionExpression' || node.value.type === 'ArrowFunctionExpression')) {
              checkFunction(node.value);
            }
          },
        };
      },
    },
  },
};
