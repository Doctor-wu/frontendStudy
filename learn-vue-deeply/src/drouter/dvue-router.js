import Link from "./drouter-link";
import View from "./drouter-view";

let Vue; // 这里不直接import Vue的原因是现在封装的是一个插件，我们这个插件不想产生依赖(如果import Vue，则webpack会把Vue也打包)

class DVueRouter {
    constructor(options) {
        this.$options = options;

        // 需要创建响应式的current属性
        // 利用Vue提供的util中的defineReactive创建响应式属性
        // 这样以后用到这个current属性的组件都会被收集起来
        // 当current改变时, 会通知收集的组件进行更新
        // Vue.util.defineReactive(this, "current", window.location.hash.slice(1) || "/");
        Vue.util.defineReactive(this, "matched", []);
        this.current = window.location.hash.slice(1) || "/";
        this.match();

        // 监听页面加载以及哈希变化
        window.addEventListener("hashchange", this.onHashChange.bind(this));
        window.addEventListener("load", this.onHashChange.bind(this));

        this.routeMap = {};
        options.routes.forEach(route => {
            this.routeMap[route.path] = route
        })
    }


    match(routes, prefix) {
        routes = routes || this.$options.routes;
        for (const route of routes) {
            const path = prefix ? prefix + "/" + route.path : route.path;
            if (path === "/" && this.current === "/") {
                if (route.redirect) {
                    window.location.hash = "#" + route.redirect;
                    return;
                }
                this.matched.push(route);
                return;
            }

            // 当current包含路由对象的path时，这个路由对象算作命中
            if (path !== "/" && this.current.indexOf(path) != -1) {
                if (route.redirect) {
                    window.location.hash = "#" + route.redirect;
                    return;
                }
                this.matched.push(route);
                if (route.children) {
                    this.match(route.children, route.path);
                }
            }
        }
    }



    onHashChange() {
        this.current = window.location.hash.slice(1);
        this.matched.length = 0;
        this.match();
    }
}


DVueRouter.install = function (_Vue) {
    Vue = _Vue;

    Vue.mixin({
        beforeCreate() {
            // 确保是根实例的时候执行
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router;
            }
        }
    });


    Vue.component("router-link", Link)

    Vue.component("router-view", View)
}



export default DVueRouter;