##  关于JS的处理（兼容转换和词法检测） 

默认情况下，webpack只是把代码合并压缩了，并没有对JS进行处理,如果代码需要对一些低版本浏览器进行兼容, 我们写短ES6代码都需要进行兼容处理(需要把其转换为ES5的代码) => babel

### 安装

yarn add babel-loader @babel/core @babel/preset-env -D

```javascript
// webpack.config.js
module: {
    rules: [
        ...,
        {
            test: /\.js$/i,
            use: {
                loader: "babel-loader",
                options: {
                    presets: [
                        "@babel/preset-env"
                    ]
                }
            },
            include: path.resolve(__dirname, "src"),
            exclude: /node_modules/
        }
    ]
}
```

```javascript
// webpack.config.js  下面用到的东西需要安装
plugins: [
    // 设置类中的装饰器
    ["@babel/plugin-proposal-decorators",{
        "legacy": true
    }],
    // 设置类中的属性
    ["@babel/plugin-proposal-class-properties",{
        "loose": true
    }],
    "@babel/plugin-transform-runtime",
    "@babel/polyfill"
]
```

