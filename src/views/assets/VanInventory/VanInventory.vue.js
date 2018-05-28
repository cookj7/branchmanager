import { Loader } from '@/components/'
import api from '@/services/api'

export default {
    name: 'van-inventory',
    components: {
        Loader,
    },
    data: function() {
        return {
            loading: false,
            fields: [
                {key: 'vv_reg', label: 'Registration', sortable: true},
                {key: 'vv_description', label: 'Description'},
                {key: 'status'},
            ],
            vans: [],
        }
    },
    methods: {
        getVans: function() {
            return api.get('/vanhire/van/list', {}).then((result)=> {
                this.vans = result

                return result
            })
        },
        view: function (van) {

        },
    },
    created: function () {
        this.loading = true
        let promises = [
            this.getVans(),
        ]
        Promise.all(promises).then((result) => {
            this.loading = false
        }).catch((error) => {
            this.$router.push('/assets/dashboard')
        })
    }
}