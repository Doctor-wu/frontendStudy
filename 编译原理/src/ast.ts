import { TokenReader } from "./token-reader";
import { createTokenizer, JSXTokenizer, Tokenizer } from "./tokenizer";
const fs = require("fs");
const path = require("path");

export namespace AST {
  export type ASTNodeType =
    | typeof ASTNodeType[keyof typeof ASTNodeType]
    | typeof FinalTokenType[keyof typeof FinalTokenType];

  export interface ASTNode {
    type: ASTNodeType;
    value?: string;
    children?: ASTNode[];
  }

  // 非终结符
  export const ASTNodeType = {
    Program: Symbol("Program"),
    Expr: Symbol("Expr"),
    TagHead: Symbol("TagHead"),
    TagHeadStart: Symbol("TagHeadStart"),
    Attribute: Symbol("Attribute"),
    TagHeadEnd: Symbol("TagHeadEnd"),
    TagTail: Symbol("TagTail"),
  };

  // 终结符
  export const FinalTokenType = {
    Text: Symbol("Text"),
    LeftBracket: Symbol("LeftBracket"),
    Identifier: Symbol("Identifier"),
    AttributeKey: Symbol("AttributeKey"),
    Equator: Symbol("Equator"),
    AttributeValue: Symbol("AttributeValue"),
    BackFlash: Symbol("BackFlash"),
    RightBracket: Symbol("RightBracket"),
  };

  type UnFinalTokenHandlerReturnType = Boolean;
  type UnFinalTokenHandler = () => UnFinalTokenHandlerReturnType;

  type UnFinalToken =
    | "Program"
    | "Expr"
    | "TagHead"
    | "TagHeadStart"
    | "Attribute"
    | "TagHeadEnd"
    | "TagTail";

  interface IParse extends Record<UnFinalToken, UnFinalTokenHandler> {
    tokenReader: TokenReader;
    ast: ASTNode;
  }

  export class Parse implements IParse {
    tokenReader: TokenReader = new TokenReader([]);
    ast: ASTNode;
    currentNode!: ASTNode;
    parentNode!: ASTNode;
    currentToken!: JSXTokenizer.IToken;

    constructor(tokens: JSXTokenizer.IToken[]) {
      this.tokenReader.loadTokens(tokens);
      this.ast = this.toAST();
    }

    createASTNode(
      type: ASTNodeType,
      children: ASTNode[] = [],
      value?: string
    ): ASTNode {
      let node: ASTNode = {
        type: <any>type.toString(),
        children,
      };
      if (value !== undefined) node.value = value;
      return node;
    }

    setCurrentToken(token: JSXTokenizer.IToken | null) {
      if (token !== null) {
        this.currentToken = token;
      }
    }

    toAST(): ASTNode {
      this.Program();
      return this.ast;
    }

    Program(): UnFinalTokenHandlerReturnType {
      let root = this.createASTNode(ASTNodeType.Program, []);
      this.currentNode = root;
      this.parentNode = root;
      this.ast = root;
      if (this.Expr()) {
        console.log("AST Generate Success!");
        return true;
      }
      console.log("AST Generate Failed!");
      return false;
    }

    Expr(): UnFinalTokenHandlerReturnType {
      this.setCurrentToken(this.tokenReader.peek());
      let oldParent = this.parentNode;
      let node = this.createASTNode(ASTNodeType.Expr, []);
      this.parentNode.children?.push(node);
      this.parentNode = node;
      debugger;
      if (this.currentToken.type === JSXTokenizer.Text) {
        this.parentNode = node;
        this.parentNode.children?.push(
          this.createASTNode(
            FinalTokenType.Text,
            undefined,
            this.currentToken.value
          )
        );
        this.tokenReader.read();
        this.parentNode = oldParent;
        this.Expr();
        return true;
      } else if (this.TagHead()) {
        this.parentNode = node;
        if (this.Expr()) {
          this.parentNode = node;
          if (this.TagTail()) {
            this.parentNode = oldParent;
            this.Expr();
            return true;
          }
          this.parentNode = oldParent;
          if (!this.Expr()) {
            oldParent.children?.pop();
            return false;
          }
        }
        return true;
      }
      oldParent.children?.pop();
      return false;
      throw TypeError(`Unexcepted Token: ${this.currentToken.value}`);
    }

    TagHead(): UnFinalTokenHandlerReturnType {
      this.setCurrentToken(this.tokenReader.peek());
      let node = this.createASTNode(ASTNodeType.TagHead, []);
      let oldParent = this.parentNode;
      this.parentNode.children?.push(node);
      this.parentNode = node;
      if (this.TagHeadStart()) {
        this.parentNode = node;
        if (this.Attribute()) {
          this.parentNode = node;
          return this.TagHeadEnd();
        } else {
          this.parentNode = node;
          if (this.TagHeadEnd()) {
            return true;
          };
        }
      }
      oldParent.children?.pop();
      return false;
      throw TypeError(`Unexcepted Token: ${this.currentToken.value}`);
    }

    TagHeadStart(): UnFinalTokenHandlerReturnType {
      this.setCurrentToken(this.tokenReader.peek());
      let node = this.createASTNode(ASTNodeType.TagHeadStart, []);
      this.parentNode.children?.push(node);
      this.parentNode = node;
      if (this.currentToken.value === "<") {
        this.parentNode.children?.push(
          this.createASTNode(
            FinalTokenType.LeftBracket,
            undefined,
            this.currentToken.value
          )
        );
        this.tokenReader.read();
        this.setCurrentToken(this.tokenReader.peek());
        if (this.currentToken.type === JSXTokenizer.JSXIdentifierType) {
          this.parentNode.children?.push(
            this.createASTNode(
              FinalTokenType.Identifier,
              undefined,
              this.currentToken.value
            )
          );
          this.tokenReader.read();
          return true;
        }
        this.tokenReader.unread();
        return false;
      }
      return false;
      throw TypeError(`Unexcepted Token: ${this.currentToken.value}`);
    }

    Attribute(): UnFinalTokenHandlerReturnType {
      this.setCurrentToken(this.tokenReader.peek());
      let oldParent = this.parentNode;
      let node = this.createASTNode(ASTNodeType.Attribute, []);
      this.parentNode.children?.push(node);
      this.parentNode = node;
      if (this.currentToken.type === JSXTokenizer.JSXAttributeKey) {
        this.parentNode.children?.push(
          this.createASTNode(
            FinalTokenType.AttributeKey,
            undefined,
            this.currentToken.value
          )
        );
        this.tokenReader.read();
        if (this.tokenReader.peek()?.type === JSXTokenizer.Equator) {
          this.parentNode.children?.push(
            this.createASTNode(
              FinalTokenType.Equator,
              undefined,
              this.tokenReader.peek()?.value
            )
          );
          this.tokenReader.read();
          if (
            this.tokenReader.peek()?.type === JSXTokenizer.JSXAttributeValue
          ) {
            this.parentNode.children?.push(
              this.createASTNode(
                FinalTokenType.AttributeValue,
                undefined,
                this.tokenReader.peek()?.value
              )
            );
            this.tokenReader.read();
            this.parentNode = oldParent;
            if (this.Attribute()) return true;
            return true;
          }
          oldParent.children?.pop();
          return false;
        }
        this.parentNode = oldParent;
        if (this.Attribute()) return true;
        return true;
      }
      oldParent.children?.pop();
      return false;
      throw TypeError(`Unexcepted Token: ${this.currentToken.value}`);
    }

    TagHeadEnd(): UnFinalTokenHandlerReturnType {
      this.setCurrentToken(this.tokenReader.peek());
      let node = this.createASTNode(ASTNodeType.TagHeadEnd, []);
      this.parentNode.children?.push(node);
      this.parentNode = node;
      if (this.currentToken.type === JSXTokenizer.BackFlash) {
        this.parentNode.children?.push(
          this.createASTNode(
            FinalTokenType.BackFlash,
            undefined,
            this.currentToken.value
          )
        );
        this.tokenReader.read();
        if (this.tokenReader.peek()?.value === ">") {
          this.parentNode.children?.push(
            this.createASTNode(
              FinalTokenType.RightBracket,
              undefined,
              this.tokenReader.peek()?.value
            )
          );
          this.tokenReader.read();
          return true;
        }
        return false;
      }
      if (this.tokenReader.peek()?.value === ">") {
        this.parentNode.children?.push(
          this.createASTNode(
            FinalTokenType.RightBracket,
            undefined,
            this.tokenReader.peek()?.value
          )
        );
        this.tokenReader.read();
        return true;
      }
      throw TypeError(`Unexcepted Token: ${this.currentToken.value}`);
    }

    TagTail(): UnFinalTokenHandlerReturnType {
      this.setCurrentToken(this.tokenReader.peek());
      let node = this.createASTNode(ASTNodeType.TagTail, []);
      this.parentNode.children?.push(node);
      this.parentNode = node;
      if (this.currentToken.value === "<") {
        this.parentNode.children?.push(
          this.createASTNode(
            FinalTokenType.LeftBracket,
            undefined,
            this.currentToken.value
          )
        );
        this.tokenReader.read();
        if (this.tokenReader.peek()?.type === JSXTokenizer.BackFlash) {
          this.parentNode.children?.push(
            this.createASTNode(
              FinalTokenType.BackFlash,
              undefined,
              this.tokenReader.peek()?.value
            )
          );
          this.tokenReader.read();
          if (
            this.tokenReader.peek()?.type === JSXTokenizer.JSXIdentifierType
          ) {
            this.parentNode.children?.push(
              this.createASTNode(
                FinalTokenType.Identifier,
                undefined,
                this.tokenReader.peek()?.value
              )
            );
            this.tokenReader.read();
            if (this.tokenReader.peek()?.value === ">") {
              this.parentNode.children?.push(
                this.createASTNode(
                  FinalTokenType.RightBracket,
                  undefined,
                  this.tokenReader.peek()?.value
                )
              );
              this.tokenReader.read();
              return true;
            }
            return false;
          }
          return false;
        }
        return false;
      }
      return false;
      throw TypeError(`Unexcepted Token: ${this.currentToken.value}`);
    }
  }
}

const vformXml = fs
  .readFileSync(path.resolve(__dirname, "./vform.dxml"))
  .toString();

let tokenizer = createTokenizer(Tokenizer);
tokenizer.run(vformXml);
console.log(tokenizer.tokens.length);

let parser = new AST.Parse(tokenizer.tokens);
console.log(JSON.stringify(parser.ast));

fs.writeFileSync(
  path.resolve(__dirname, "./vformAST.json"),
  JSON.stringify(parser.ast)
);
