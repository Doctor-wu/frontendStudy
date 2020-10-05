export default {
    path: '/Login',
    name: "关于",
    component: () =>
        import ( /* webpackChunkName: "about" */ '@/views/About.vue')
}