import {createStore} from 'vuex';
export default createStore({
    state: {
        snackbar: {
            visible: false,
            content: '',
            icon: '',
            type: 'success',
        },
        /*form: {
            "Customer_Company_Name": "1800 Office Solutions",
            "Customer_Full_Name": "Jesse C.",
            "Customer_Address": "9111 Duke Blvd",
            "Customer_City": "Mason",
            "Customer_State": "OH",
            "Customer_Postal": "45040",
            "Customer_Phone": "4504504500",
            "Customer_Email": "strifejeyz@mail.com",
            "Customer_Printer": "Xerox C7025, HP E77822",
            "Current_Lessor": "Third Party Company",
            "Estimated_Black_Prints": "10000",
            "Estimated_Color_Prints": "6000",
            "Monthly_Base_Price": "$199",
            "Lease_Term": "60 Months",
        },*/
        form: null,
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
});
