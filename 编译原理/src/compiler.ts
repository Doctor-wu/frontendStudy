import { AST } from "./ast";
import { createTokenizer, JSXTokenizer, Tokenizer } from "./tokenizer";
const fs = require("fs");

export module JSXCompiler {
  export interface compileFileOptions {
    path: string;
    extractParserNode?: Boolean; // 是否摘除掉AST解析时递归下降语法的辅助节点
  }

  export interface Compiler {
    tokenizer: JSXTokenizer.ITokenizer;
    astParser: AST.IParse;
    tokens: JSXTokenizer.IToken[];
    ast?: AST.ASTNode;

    compile(template: string): AST.ASTNode;
    compileFile(options: compileFileOptions): AST.ASTNode;
  }

  export class Compiler implements Compiler {
    tokenizer: JSXTokenizer.ITokenizer = createTokenizer(Tokenizer);
    astParser: AST.IParse = new AST.Parse([]);
    tokens: JSXTokenizer.IToken[] = [];
    ast?: AST.ASTNode;


    compile(template: string) {
      this.tokens = this.tokenizer.run(template);
      this.ast = this.astParser.createAST(this.tokens);
      return this.ast;
    }

    compileFile(options: compileFileOptions): AST.ASTNode {
      let template = fs.readFileSync(options.path).toString();
      
      return this.compile(template);
    }
  }
}
