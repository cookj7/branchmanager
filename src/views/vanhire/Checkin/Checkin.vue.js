import api from '@/services/api'

export default {
    name: 'vanhire-checkin',
    data: function() {
        return {
            pending: {
                sortBy: 'v_start',
                sortDesc: true,
                items: [
                ],
                fields: [
                    {key: 'basket_id', label: 'Order Reference', sortable: true},
                    {key: 'name', sortable: true},
                    {key: 'v_start', label: 'start', sortable: true},
                    {key: 'v_end', label: 'end', sortable: true},
                    {key: 'v_postcode', label: 'Postcode', sortable: true}
                ],
                currentPage: 1,
                perPage: 5,
                totalRows: 0,
            },
            active: {
                sortBy: 'v_start',
                sortDesc: true,
                items: [
                ],
                fields: [
                    {key: 'basket_id', label: 'Order Reference', sortable: true},
                    {key: 'name', sortable: true},
                    {key: 'v_start', label: 'start', sortable: true},
                    {key: 'v_end', label: 'end', sortable: true},
                    {key: 'v_postcode', label: 'Postcode', sortable: true}
                ],
                currentPage: 1,
                perPage: 5,
                totalRows: 0,
            },
        }
    },
    methods: {
        view (record) {
            if (!record && !record.vanhire_id) {
                return;
            }

            if (record.vanhire_state_id == 30) {
                this.$router.push('/vanhire/' + record.vanhire_id + '/checkin/edit');
            } else {
                this.$router.push('/vanhire/' + record.vanhire_id + '/checkin');
            }
        },
        findPending (ctx) {
            let promise = api.get('/vanhire/list', {results_per_page: this.pending.perPage, current_page: this.pending.currentPage, state: 20, sort: this.pending.sortBy, desc: this.pending.sortDesc ? 1 : 0})

            return promise.then((data) => {
                const items = data.items
                this.pending.totalRows = parseInt(data.pages.total)
                return(items)
            }).catch(error => {
                return []
            })
        },
        findActive (ctx) {
            let promise = api.get('/vanhire/list', {results_per_page: this.active.perPage, current_page: this.active.currentPage, state: 30, sort: this.active.sortBy, desc: this.active.sortDesc ? 1 : 0})

            return promise.then((data) => {
                const items = data.items
                this.active.totalRows = parseInt(data.pages.total)
                return(items)
            }).catch(error => {
                return []
            })
        }
    },
}