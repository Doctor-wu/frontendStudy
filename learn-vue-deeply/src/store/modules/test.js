const state = {
    test: 'doctorwu'
}
const mutations = {
    CHANGE_TEST: (state, val) => {
        state.msg = val
    }
}
const actions = {
    change_test(context, val) {
        context.commit('CHANGE_TEST', val)
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}