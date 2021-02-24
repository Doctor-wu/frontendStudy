import Vue from 'vue'
import App from './App.vue'
import router from './drouter'
import store from './dstore'
import create from '@/utils/create'
import "./style/index.css"

Vue.prototype.$create = create;

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')