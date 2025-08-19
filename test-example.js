// Test file to demonstrate the ESLint rule

// This function has blank lines (will be flagged)
function badExample() {
  const a = 1;

  const b = 2;

  return a + b;
}

// This function is clean (no issues)
function goodExample() {
  const a = 1;
  const b = 2;
  return a + b;
}

// Arrow function with blank lines (will be flagged)
const arrowBad = () => {
  console.log('start');

  console.log('end');
};

// Class method with blank lines (will be flagged)
class TestClass {
  myMethod() {
    const x = 1;

    return x;
  }
}
