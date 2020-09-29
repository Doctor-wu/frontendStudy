## Tree-Shaking&Scope-Hosting



### Tree-Shaking

唯一一个需要在package.json中配置的

```javascript
// package.json
"sideEffects": [
    "**/*.css" // 排除CSS文件
]
// 这样配置过后就会把没使用的文件晃动掉
```

```javascript
// webpack.config.js

optimization:{
    usedExports: true  //开发环境下配置标识，会告诉你用到了哪些模块
}
```



### Scope-Hosting

作用域提升，减少代码体积，节约内存

多个函数内存的占用也减少