import api from '@/services/api'


const login = (context) => {
    api.post('/user/show').then((user) => {
        context.commit('USER_LOGIN', user);

        return user
    }).catch(() => {
        console.log('some error')
    })
};

export default {
    login,
};