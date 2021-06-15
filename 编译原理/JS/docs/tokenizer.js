"use strict";
var esprima = require('esprima');
var sourceCode = "<h1 id=\"title\"><span>hello</span>world</h1>";
var ast = esprima.parseModule(sourceCode, { jsx: true, tokens: true });
console.log(ast);
