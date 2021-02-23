import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
Vue.use(Vuex)
const modulesFiles = require.context('./modules', true, /\.js$/);
console.log(modulesFiles);
const mymodules = modulesFiles.keys().reduce((modules, modulePath) => {
    console.log(modulePath, modules);
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})

/**
modules:{
  article:{
    namespaced:true,
    state:{},
    ...
  },
  header:{
    namespaced:true,
    state:{},
    ...
  }
}
 */
const store = new Vuex.Store({
    modules: mymodules,
    getters
})

export default store