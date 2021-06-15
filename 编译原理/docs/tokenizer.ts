let esprima = require('esprima');
let sourceCode = `<h1 id="title"><span>hello</span>world</h1>`;
let ast = esprima.parseModule(sourceCode, { jsx: true, tokens: true });

console.log(ast);
