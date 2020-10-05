export default {
    path: '/component-pratice',
    name: "组件实践练习",
    component: () =>
        import( /* webpackChunkName: "about" */ '@/views/component-pratice/component-pratice.vue')
}