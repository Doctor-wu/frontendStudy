## 配置devServer

```javascript
// webpack.config.js
devServer: {
    prot: 8888,
    open: true,
    compress: true,
    contentBase: path.resolve(__dirname, "static"),
    proxy:{
        "/api":{
            target: "http://localhost:9000",
            secure: false,   // true的话表示的是https false表示的是http
            changeOrigin: true, // 把请求头的host值改成服务器的地址
            pathRewrite: {"/api":""}
        }
    },
    before: function(app, server){ // webpack提供的代理服务
        app.get("/xxx", function(req, res){
            res.json({})
        })
    }
}
```

