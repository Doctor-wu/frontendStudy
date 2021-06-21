import { JSXCompiler } from "./compiler";
const path = require("path");
const fs = require("fs");

const compiler = new JSXCompiler.Compiler();
compileTemplates('auth',true);
// compileTemplates('vform-item',true);
// compileTemplates('vform',true);
// compileTemplates('auth');
// compileTemplates('vform-item');
// compileTemplates('vform');


function compileTemplates(fileName: string, extract: boolean = false) {
  const ast = compiler.compileFile({
    path: path.resolve(__dirname, `templates/${fileName}.dxml`),
    extractParserNode: !!extract,
  });
  
  fs.writeFileSync(
    path.resolve(__dirname, `./targets/${fileName}${extract ? '-extracted-' : '-'}AST.json`),
    JSON.stringify(ast, (key, value) => {
      if (key === "type") return value.toString();
      return value;
    }, 2)
  );
  
}
