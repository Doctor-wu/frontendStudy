import babel from "rollup-plugin-babel";

export default {
    input: "./src/index.js",
    output: {
        format: "umd",// amd + commonjs
        name: "Vue", // window.Vue
        file: "dist/vue.js", // 打包输出路径
        sourcemap: true // es5 -> es6源码
    },
    plugins: [
        babel({
            exclude: "node_modules/**" // node_modules下的文件不用babel转换
        })
    ]
}
