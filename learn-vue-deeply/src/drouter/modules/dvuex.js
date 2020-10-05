let name = "dvuex";
export default {
    path: `/${name}`,
    name: "实现自己的vuex",
    component: () =>
        import( /* webpackChunkName: "about" */ `@/views/${name}/${name}.vue`)
}