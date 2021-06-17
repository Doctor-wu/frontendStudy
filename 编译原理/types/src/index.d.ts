export {};
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
