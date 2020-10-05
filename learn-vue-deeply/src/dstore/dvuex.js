let Vue;

class Store {
    constructor(options) {
        this._actions = options.actions;
        this._mutations = options.mutations;

        this._vm = new Vue({
            data: options.state,
            computed: (() => {
                let get = {},
                    getters = options.getters;
                for (const key in getters) {
                    if (getters.hasOwnProperty(key)) {
                        get[key] = getters[key];
                    }
                }
                return get;
            })()
        });
        console.log(this);
        this.commit = this.commit.bind(this);
        this.dispatch = this.dispatch.bind(this);
        this.getters = this._vm;
    }

    // type: 提交的类型    payload：载荷，即参数
    commit(type, payload) {
        return this._mutations[type] && this._mutations[type].call(this, this.state, payload);
    }

    // type: 提交的类型    payload：载荷，即参数
    dispatch(type, payload) {
        return this._actions[type] && this._actions[type].call(this, this, payload);
    }

    get state() {
        return this._vm._data
    }
    set state(val) {
        console.error("不要这样更改!");
    }
}



function install(_Vue) {
    Vue = _Vue;
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) { // 判断是否为根实例
                Vue.prototype.$store = this.$options.store;
            }
        }
    })
}


export default {
    Store,
    install
}