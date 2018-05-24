import user from '../../net/user'

// initial state
// shape: [{ id, quantity }]
const state = {
    userInfo: {},
    checkoutStatus: null
};

// getters
const getters = {};
// actions
const actions = {
    initUserInfo({commit, state}, callback) {
        user.initUserInfo().then((res) => {
            if (res && res.result) {
                commit('storeUserInfo', res.data);
            }
            callback && callback(res);
        });
    },
    doLogin({commit,state},params){
        user.doLogin(params.compno,params.account,params.password).then(res=>{
            params.resultCallback && params.resultCallback(res);
        });
    },
    switchClinic({commit,state},params){
        user.switchClinic().then(res=>{
            params.resultCallback && params.resultCallback(res);
        });
    },
};

// mutations
const mutations = {
    storeUserInfo(state, userInfo) {
        state.userInfo = userInfo;
    },

};

export default {
    state,
    getters,
    actions,
    mutations
}