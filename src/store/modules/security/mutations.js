import Vue from 'vue'

const USER_INITIALISE = (state, {logged, user, permissions, branches}) => {
    state.logged = logged;
    state.user = user
    state.permissions = permissions
    state.branches = branches
};

const USER_READY = (state) => {
    state.initialised = true;
};

const USER_LOGIN = (state, {user, permissions, branches}) => {
    state.logged = true;
    state.user = user
    state.permissions = permissions
    state.branches = branches

    Vue.localStorage.set('security', state)
};

const USER_LOGOUT = (state) => {
    state.logged = false;
    state.user = {}
    state.permissions = {}
    state.branches = {}

    Vue.localStorage.remove('security')
};

export default {
    USER_INITIALISE,
    USER_READY,
    USER_LOGIN,
    USER_LOGOUT,
};