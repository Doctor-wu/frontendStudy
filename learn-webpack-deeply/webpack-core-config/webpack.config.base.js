const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./public"),
        filename: "[name]-[chunkhash:6].js"
    },
    module: {
        rules: [{
            test: /\.s[ac]ss$/i,
            include: path.resolve(__dirname, "./src"),
            use: [
                MiniCssExtractPlugin.loader, {
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
        }, {
            test: /\.(png|jpe?g|gif|ttf|svg|woff2?)$/i,
            include: path.resolve(__dirname, "./src"),
            use: {
                // url-loader 包含 file-loader
                loader: "url-loader",
                options: {
                    name: "[name]_[hash:6].[ext]",
                    outputPath: "images/",
                    // 未超过1024*10字节的图片会在打包时被转换成base64的格式
                    limit: 1024 * 10
                }
            }
        }, {
            test: /\.js$/i,
            loader: "babel-loader",
            include: path.resolve(__dirname, "./src"),
        }]
    },
    // mode为development时默认source-map是打开的，可以将devtool设置为none关闭sourcemap，不过有什么必要呢
    // mode为production时默认source-map是关闭的，不建议在生产环境开启source-map

    resolve: {
        /**
         * resolve.modules用用于配置webpack去哪些目目录下寻找第三方方模块,默认是['node_modules']
         *    寻找第三方方模块,默认是在当前项目目目目录下的node_modules里里里面面去找,如果没有找到,就会去上一一级
         *    目目录../node_modules找,再没有会去../../node_modules中找,以此类推,和Node.js的模块寻找机制
         *    很类似。
         *    如果我们的第三方方模块都安装在了了项目目根目目录下,就可以直接指明这个路路径。
         */
        modules: [path.resolve(__dirname, "./node_modules")],

        /**
         * resolve.alias配置通过别名来将原导入入路路径映射成一一个新的导入入路路径
         *    拿react为例例,我们引入入的react库,一一般存在两套代码
         * 
         *    cjs
         *    采用用commonJS规范的模块化代码
         * 
         *    umd
         *    已经打包好的完整代码,没有采用用模块化,可以直接执行行行
         * 
         *    默认情况下,webpack会从入口文件./node_modules/bin/react/index开始递归解析和处理理依赖
         *    的文文件。我们可以直接指定文文件,避免这处的耗时。
         */
        alias: {
            "@": path.join(__dirname, "./pages"),
            react: path.resolve(
                __dirname,
                "./node_modules/react/umd/react.production.min.js"
            ),
            "react-dom": path.resolve(
                __dirname,
                "./node_modules/react-dom/umd/react-dom.production.min.js"
            )
        },
        /**
         * resolve.extensions在导入入语句没带文件后缀时,webpack会自动带上后缀后,去尝试查找文件是否存在。
         * 
         * 后缀尝试列表尽量的小
         * 导入语句尽量的带上后缀。
         */
        extensions: ['.js', '.json', '.jsx', '.ts']
    },


    /**
     *    //公司有cdn
     *    //静态资源有部署到cdn 有链接了了
     *    // 我想使用用cdn!!!!!!!!
     *    我的bundle文件里,就不用打包进去这个依赖了了,体积会小
     *    我们可以将一些JS文件存储在 CDN 上(减少 Webpack 打包出来的 js 体积),在 index.html 中通过
     *    标签引入
     */
    externals: {
        //jquery通过script引入入之后,全局中即有了了 jQuery 变量量
        'jquery': 'jQuery'
    },


    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name][chunkhash:8].css"
        }),
    ]
}