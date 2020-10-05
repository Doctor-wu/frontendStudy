import Vue from 'vue'
import VueRouter from './dvue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

Vue.use(VueRouter)


const routeList = []



/**
 * 描述
 * @author Doctorwu
 * @date 2020-09-20
 * @description 这个地方解耦了路由的引入，只需要在router文件夹内编写路由对象的配置即可，记得导出噢
 */
importAll(require.context('./modules', true, /\.js/))

function importAll(r) {
    r.keys().forEach(key => {
        routeList.push(r(key).default)
    });
    store.dispatch("menu/change_menu", routeList);
}
const routes = [{
        path: "/",
        redirect: "/home",
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    ...routeList
]


const router = new VueRouter({
    routes
});

export default router;