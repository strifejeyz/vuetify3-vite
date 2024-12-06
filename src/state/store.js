import {createStore} from 'vuex';
import createPersistedState from 'vuex-persistedstate';
export default createStore({
    state: {
        snackbar: {
            visible: false,
            content: '',
            icon: '',
            type: 'success',
        },
        is_mobile: window.innerWidth <= 768
    },
    actions: {
        SetSnackbar({commit}, params) {
            commit('SET_ANY_STATE', {
                target: 'snackbar',
                value: params
            });
        },
        SetError({commit}, message) {
            commit('SET_SNACKBAR', {
                visible: true,
                content: message,
                type: 'error',
                icon: 'mdi-alert-circle-outline'
            });
        },
        SetSuccess({commit}, message) {
            commit('SET_SNACKBAR', {
                visible: true,
                content: message,
                type: 'success',
                icon: 'mdi-check-all'
            });
        },
        SetAnyState({commit}, params) {
            commit('SET_ANY_STATE', params)
        }
    },
    mutations: {
        SET_SNACKBAR(state, params) {
            state.snackbar.visible = params.visible;
            state.snackbar.content = params.content;
            state.snackbar.icon = params.icon;
            state.snackbar.type = params.type;
        },
        SET_ANY_STATE(state, {target, value}) {
            state[target] = value;
        },
    },

    // Persist your state
    plugins: [createPersistedState({
        paths: []
    })]
});
