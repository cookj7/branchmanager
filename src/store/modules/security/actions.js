import api from '@/services/api'
import Vue from 'vue'

const initialise = (context) => {
    context.commit('USER_READY');

    if (!Vue.localStorage.has('security')) {
        return
    }

    context.commit('USER_INITIALISE', Vue.localStorage.get('security'));
};


const login = (context, {username, password}) => {
    return api.post('/user/login', {
        username: username,
        password: password,
    }).then((user) => {
        context.commit('USER_LOGIN', user);
        return user
    })
};

const logout = (context) => {
    return api.post('/user/logout').then((response) => {
        context.commit('USER_LOGOUT');
        return response
    })
};

const destroy = (context) => {
    context.commit('USER_LOGOUT');
};

export default {
    initialise,
    login,
    logout,
    destroy,
};