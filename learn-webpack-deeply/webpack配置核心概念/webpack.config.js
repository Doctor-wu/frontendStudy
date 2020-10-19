const path = require("path");
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./public"),
        filename: "[name]-[chunkhash:6].js"
    },
    mode: "development",
    module: {
        rules: [{
            test: /\.s[ac]ss$/i,
            use: ["style-loader", {
                    loader: "css-loader",
                    options: {
                        // 开启CSS modules
                        modules: true
                    }
                },
                {
                    // 要加在css-loader之前
                    loader: "postcss-loader"
                }, "sass-loader"
            ]
        },{
            test: /\.(png|jpe?g|gif|ttf)$/i,
            use: {
                loader: "file-loader",
                options: {
                    name: "[name]_[hash:6].[ext]",
                    outputPath: "images/"
                }
            }
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./index.html"
        })
    ]
}