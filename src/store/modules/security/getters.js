const user = state => state.user;
const logged = state => state.logged === true
const initialised = state => state.initialised === true

export default {
    user,
    logged,
    initialised,
};