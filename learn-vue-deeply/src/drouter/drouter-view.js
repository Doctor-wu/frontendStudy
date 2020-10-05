export default {
    render(h) {
        const router = this.$router;
        const {
            routeMap
        } = router;
        // 从原型上$router的routes里面找出匹配的路由对象
        let findRoute = routeMap[router.current];
        if (findRoute && findRoute.redirect) {
            window.location.hash = "#" + findRoute.redirect;
            return;
        }
        return h(findRoute && findRoute.component || null)
    }
}