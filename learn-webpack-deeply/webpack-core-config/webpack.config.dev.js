const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
module.exports = {

    mode: "development",
    devtool: "source-map",

    devServer: {
        // 静态资源目录
        // contentBase: "./dist",
        // 是否在开启服务后自动打开默认浏览器窗口
        // open: true, 
        port: 8088
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./index.html",
            title: "webpack",
            filename: "index.html"
        }),
    ]
}