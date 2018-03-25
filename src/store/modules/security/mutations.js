const USER_LOGIN = (state, user) => {
    state.user.logged = true;
    //state.user.token = user.token
};

export default {
    USER_LOGIN,
};