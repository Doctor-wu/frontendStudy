##  关于CSS（LESS）的处理 



### 安装

npm i css-loader style-loader less less-loader autoprefixer postcss-loader -D

如果使用sass则需要安装 sass node-sass sass-loader



### 配置

```javascript
// 默认顺序 从右到左， 从下到上
modules: {
    rules: [
        {
            test: /\.(css|less)$/i,
            use: [
                "style-loader", // 把处理好的CSS插入页面中
                "css-loader", // 处理@import/URL这种语法
                "postcss-loader", // 设置css前缀（处理兼容 需要搭配autoprefixer使用）
                {
                    loader: "less-loader",
                    options: {
                        ...
                    }
                }
            ]
        }
    ]
}
```

```javascript
// postcss.config.js
module.exports = {
    plugins: [
        require("autoprefixer")
    ]
}
```

```json
// package.json
...
"browserlist": [
    "> 1%",
    "last 2 versions"
]
```



### 把CSS从内嵌式改为外链式

```javascript
// mini-css-extract-plugin
plugins: [
    new MiniCssExtractPlugin({
        filename: "main.[hash].css"
    })
]



module: {
    rules:[
        {
            test: /\.(css|less)$/i,
            use: [
                //"style-loader", // 把处理好的CSS插入页面中
                MiniCssExtractPlugin.loader, // 使用插件中的loader替代style-loader
                "css-loader", // 处理@import/URL这种语法
                "postcss-loader", // 设置css前缀（处理兼容 需要搭配autoprefixer使用）
                {
                    loader: "less-loader",
                    options: {
                        ...
                    }
                }
            ]
        }
    ]
}
```



