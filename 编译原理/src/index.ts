import { JSXCompiler } from "./compiler";
const path = require("path");
const fs = require("fs");

const compiler = new JSXCompiler.Compiler;
const authAST = compiler.compileFile({
  path: path.resolve(__dirname, "templates/auth.dxml")
});

// fs.writeFileSync(
//   path.resolve(__dirname, "./targets/authAST.json"),
//   JSON.stringify(authAST),
// );

const demoAST = compiler.compile('<div>123</div>');
console.log(JSON.stringify(demoAST));


// const vformXml = fs
//   .readFileSync(path.resolve(__dirname, "./vform.dxml"))
//   .toString();
// const vformItemXml = fs
//   .readFileSync(path.resolve(__dirname, "./vform-item.dxml"))
//   .toString();

// let tokenizer = createTokenizer(Tokenizer);
// tokenizer.run(vformXml);
// fs.writeFileSync(
//   path.resolve(__dirname, "./vformToken.json"),
//   JSON.stringify(
//     tokenizer.tokens.map((token) => {
//       return {
//         type: token.type?.toString(),
//         value: token.value,
//       };
//     })
//   )
// );
// tokenizer.run(vformItemXml);
// fs.writeFileSync(
//   path.resolve(__dirname, "./vformItemToken.json"),
//   JSON.stringify(
//     tokenizer.tokens.map((token) => {
//       return {
//         type: token.type?.toString(),
//         value: token.value,
//       };
//     })
//   )
// );

/**
 * expected
   [
    { type: 'Punctuator', value: '<' },
    { type: 'JSXIdentifier', value: 'h1' },
    { type: 'JSXIdentifier', value: 'id' },
    { type: 'Punctuator', value: '=' },
    { type: 'String', value: '"title"' },
    { type: 'Punctuator', value: '>' },
    { type: 'Punctuator', value: '<' },
    { type: 'JSXIdentifier', value: 'span' },
    { type: 'Punctuator', value: '>' },
    { type: 'JSXText', value: 'hello' },
    { type: 'Punctuator', value: '<' },
    { type: 'Punctuator', value: '/' },
    { type: 'JSXIdentifier', value: 'span' },
    { type: 'Punctuator', value: '>' },
    { type: 'JSXText', value: 'world' },
    { type: 'Punctuator', value: '<' },
    { type: 'Punctuator', value: '/' },
    { type: 'JSXIdentifier', value: 'h1' },
    { type: 'Punctuator', value: '>' }
  ]

  my output
  [
    { type: Symbol(TagStartType), value: '<' },
    { type: Symbol(JSXIdentifier), value: 'h1' },
    { type: Symbol(JSXAttributeKey), value: 'id' },
    { type: Symbol(Equator), value: '=' },
    { type: Symbol(JSXAttributeValue), value: '"title"' },
    { type: Symbol(TagEndType), value: '>' },
    { type: Symbol(TagStartType), value: '<' },
    { type: Symbol(JSXIdentifier), value: 'span' },
    { type: Symbol(TagEndType), value: '>' },
    { type: Symbol(Text), value: 'hello' },
    { type: Symbol(TagStartType), value: '<' },
    { type: Symbol(BackFlash), value: '/' },
    { type: Symbol(JSXIdentifier), value: 'span' },
    { type: Symbol(TagEndType), value: '>' },
    { type: Symbol(Text), value: 'world' },
    { type: Symbol(TagStartType), value: '<' },
    { type: Symbol(BackFlash), value: '/' },
    { type: Symbol(JSXIdentifier), value: 'h1' },
    { type: Symbol(TagEndType), value: '>' }
  ]
 */
