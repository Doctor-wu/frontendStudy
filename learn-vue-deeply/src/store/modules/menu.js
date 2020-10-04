const state = {
    menus: []
}
const mutations = {
    CHANGE_MENU: (state, val) => {
        state.menus = val.filter(i => true);
    }
}
const actions = {
    change_menu(context, val) {
        context.commit('CHANGE_MENU', val);
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}