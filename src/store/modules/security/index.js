import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
    initialised: false,
    logged: false,
    user: {},
    permissions: {},
    branches: {}
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};