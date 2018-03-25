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
            loginApi: 'security/login' // map `this.add()` to `this.$store.dispatch('increment')`
        }),
        login: function () {
            this.loginApi().then(() => {
                console.log('yo', this.user)
            })
        }
    },
    name: 'Login'
}
