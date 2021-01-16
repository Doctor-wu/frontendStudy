class Base {
    invoke<This extends Base & Record<Property, This[Property]>, Property extends string>(
        this: This, property: Property,
        ...args: Parameters<This[Property]>
    ) {
        this[property](...args);
    }
}
// //基类Base 含有一个方法 invoke
// // 可以调用自己身上的方法
// class Foo extends Base {
//     foo(x: number, y: string) {}
// }
// const foo = new Foo;
// foo.invoke('foo', 123, 'abc'); // ok, Foo 类含有方法 foo, 参数也对
// foo.invoke('foo', 123, 'abc', 456); // 错误, 参数多了
// foo.invoke('foo', 'abc', 123); // 错误，参数错了
// foo.invoke('foo', 123); // 错误，参数少了
// foo.invoke('bar', 123); // 错误，没有函数 bar
//
// class Bar extends Foo {
//     bar(x: boolean) {}
// }
// const bar = new Bar;
// bar.invoke('foo', 123, 'abc'); // ok, 这是 Foo 上的方法
// bar.invoke('bar', true); // ok, 这是 Bar 上的方法
// bar.invoke('foobar'); // ?_?

