const fs = require('fs');
const babel = require('@babel/core');

const code = `
const el = (
  <pre>
    <span>1</span>
    <span>2</span>
  </pre>
);
`;

const result = babel.transformSync(code, {
  presets: ['@babel/preset-react']
});

console.log(result.code);
