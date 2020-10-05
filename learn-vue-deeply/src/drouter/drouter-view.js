export default {
    render(h) {
        // 将自己标记为router-view组件
        this.$vnode.data.routerView = true;

        const router = this.$router;
        const {
            routeMap
        } = router;

        let depth = 0,
            parent = this.$parent;
        while (parent) {
            const vnodeData = parent.$vnode && parent.$vnode.data;
            if (vnodeData && vnodeData.routerView) {
                // 上级中每有一个router-viewdepth就加一
                depth++;
            }
            parent = parent.$parent;
        }


        // // 从原型上$router的routes里面找出匹配的路由对象
        // let findRoute = routeMap[router.current];
        // if (findRoute && findRoute.redirect) {
        //     window.location.hash = "#" + findRoute.redirect;
        //     return;
        // }
        // return h(findRoute && findRoute.component || null)
        let component = null;
        const route = this.$router.matched[depth];
        route && (component = route.component);
        return h(component)
    }
}