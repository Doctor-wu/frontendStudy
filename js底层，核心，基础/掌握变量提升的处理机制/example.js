// fn();// 5
// function fn(){ // 变量提升阶段已经处理过了，这里不再处理
//     console.log(1);
// }
// fn();// 5
// function fn(){ // 变量提升阶段已经处理过了，这里不再处理
//     console.log(2);
// }
// fn();// 5
// var fn = function (){ // var fn不用再处理，但是赋值在变量提升阶段没处理过，此处需处理 全局上下文中的那个函数输出3
//     console.log(3);
// }
// fn();// 3
// function fn(){ // 变量提升阶段已经处理过了，这里不再处理
//     console.log(4);
// }
// fn();// 3
// function fn(){ // 变量提升阶段已经处理过了，这里不再处理
//     console.log(5);
// }
// fn();// 3


{
    function foo() {};
    foo = 1;
}

console.log(foo);