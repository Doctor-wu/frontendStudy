## 删除无用的JS代码

### 安装

yarn add purgecss-webpack-plugin glob -D

### 使用

```javascript
// webpack.prod.js
const PurgecssPlugin = require("purgecss-webpack-plugin");
const glob = require("glob");
const path = requrie("path");

module.exports = {
    ...,
    plugins: [
        new PurgecssPlugin({
            path: glob.sync(`${path.resolve(__dirname, "src")}/**/*`, {
                nodir: true
            })
        })
    ]
}
```

如果想用cdn引入其他库但是又在文件中用引入的语法声明了变量, 可以在webpack的配置中配置 externals:{"jquery":"$"}(例子)







## 删除无用CSS代码

### 安装 

yarn add mini-css-extract-plugin -D

### 使用

```javascript
// 默认顺序 从右到左， 从下到上
modules: {
    rules: [
        {
            test: /\.css$/i,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader
                },
                "css-loader", // 处理@import/URL这种语法
            ]
        }
    ]
}
```

