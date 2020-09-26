##  配置HTML页面模板进行打包 以及dev-server热更新

借助html-webpack-plugin插件，帮我们处理html的编译和文件的导入



### 安装html-webpack-plugin

yarn add html-webpack-plugin -S



### 借助webpack-dev-server实现热更新和代理

dev-server无需配置插件，直接在export出去的对象中配置即可

dev-server编译好的结果放在内存中

**配置项**

- port: web服务的端口号
- compress：是否开启GZIP压缩
- progress：是否显示编译进度
- contentBase: 指定资源访问路径, 需要为绝对路径
- open: 是否自动打开浏览器
- hot：是否开启热更新
- proxy：跨域代理

**用途**

- 热更新：代码改变后自动编译并且更新
- 代理：解决跨域问题

**用法**

在package.json中配置scripts项：webpack-dev-server



### 借助clean-webpack-plugin保证只保留最新的build





### 在配置文件中配置插件

```javascript
plugins: [
    new Plugin1,
    new Plugin2,
    ...
]
```

