import { AST } from "./ast";
import { createTokenizer, JSXTokenizer, Tokenizer } from "./tokenizer";
const fs = require("fs");

export module JSXCompiler {
  export interface compileFileOptions {
    path: string;
    reserveParserNode?: Boolean; // 是否保留AST解析时递归下降语法的辅助节点
  }

  export interface ICompiler {
    tokenizer: JSXTokenizer.ITokenizer;
    astParser: AST.IParse;
    tokens: JSXTokenizer.IToken[];
    ast?: AST.ASTNode;

    compile(template: string): AST.ASTNode;
    compileFile(options: compileFileOptions): AST.ASTNode;
    extractASTParserNode(node: AST.ASTNode): AST.ASTNode;
  }

  const extractASTParserNodeSet: {
    [prop: string]: boolean;
  } = {};
  [
    AST.ASTNodeType.TagHead,
    AST.ASTNodeType.TagTail,
    AST.ASTNodeType.TagHeadStart,
    AST.ASTNodeType.TagHeadEnd,
  ].forEach((key) => {
    extractASTParserNodeSet[key.toString()] = true;
  });

  export class Compiler implements ICompiler {
    tokenizer: JSXTokenizer.ITokenizer = createTokenizer(Tokenizer);
    astParser: AST.IParse = new AST.Parse([]);
    tokens: JSXTokenizer.IToken[] = [];
    ast?: AST.ASTNode;

    compile(template: string, reserve: Boolean = false) {
      console.log('================== Compile Start ====================');
      
      this.tokens = this.tokenizer.run(template);
      this.ast = this.astParser.createAST(this.tokens);
      
      if (!reserve) return this.extractASTParserNode(this.ast);
      console.log('================== Compile Success! ====================');
      return this.ast;
    }

    compileFile(options: compileFileOptions): AST.ASTNode {
      let template = fs.readFileSync(options.path).toString();

      return this.compile(template, options.reserveParserNode);
    }

    extractASTParserNode(node: AST.ASTNode): AST.ASTNode {
      let extractedNode = Object.assign({}, node);

      function extract(child: AST.ASTNode): AST.ASTNode[]{
        if (extractASTParserNodeSet[child.type.toString()]) {
          if (!child.children) return [child];
          return child.children.map(item => extract(item)).flat();
        }
        if (!child.children) return [child];
        child.children = child.children.map(item => extract(item)).flat();
        return [child];
      }
      if (!node.children) return node;
      extractedNode.children = node.children.map(item => extract(item)).flat();
      console.log('Extract AST Parser Node Success!');
      console.log('================== Compile Success! ====================');
      
      return extractedNode;
    }
  }
}
