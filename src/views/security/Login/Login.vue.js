import { mapGetters, mapActions } from 'vuex'

export default
{
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters({
            user: 'security/user'
        })
    },
    methods: {
        ...mapActions({
            loginApi: 'security/login'
        }),
        login: function () {
            this.loginApi({
                username: 'jcook',
                password: 'zxdfcv45'
            }).then(() => {
                let redirectUrl = this.$route.query.redirect || '/dashboard'
                this.$router.push(redirectUrl);
            })
        }
    },
    created: function() {

    },
    name: 'Login'
}
