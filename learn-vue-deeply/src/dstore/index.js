import Vue from 'vue';
import Vuex from './dvuex';
import getters from './getters';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        value: 0
    },
    mutations: {
        UPDATE_VALUE(state, payload) {
            state.value += payload;
        }
    },
    actions: {
        update_value({
            commit
        }, payload) {
            setTimeout(() => {
                commit('UPDATE_VALUE', payload);
            }, 1000);
        }
    },
    getters
});

export default store