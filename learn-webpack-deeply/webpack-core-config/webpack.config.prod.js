const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");

module.exports = {
    mode: "production",
    plugins: [
        new CleanWebpackPlugin(),
        new OptimizeCSSAssetsPlugin({
            cssProcessor: require("cssnano"), //引入入cssnano配置压缩选项
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                }
            }
        }),
        new HtmlWebpackPlugin({
            template: "./index.html",
            title: "webpack",
            filename: "index.html",
            minify: {
                // 压缩HTML文文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空白白符与换行行行符
                minifyCSS: true // 压缩内联css
            }
        }),
    ]
}