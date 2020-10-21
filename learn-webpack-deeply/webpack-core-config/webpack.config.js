const isProd = process.env.NODE_ENV === "production";
const {
    merge
} = require("webpack-merge");

const commonConfig = require("./webpack.config.base.js");
const prodConfig = require("./webpack.config.prod.js");
const devConfig = require("./webpack.config.dev.js");

console.log(process.env.NODE_ENV, isProd, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");


module.exports = () => {
    if (isProd) {
        return merge(commonConfig, prodConfig)
    } else {
        return merge(commonConfig, devConfig)
    }
}