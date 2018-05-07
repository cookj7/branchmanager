import api from '@/services/api'

export default {
    name: 'vanhire-dashboard',
    data: function() {
        return {
            checkout: {
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
            checkin: {
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
            refund: {
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
            completed: {
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

            console.log();

            switch (parseInt(record.vanhire_state_id)) {
                case 10:
                    this.$router.push('/vanhire/' + record.vanhire_id + '/checkout');
                    break;
                case 20:
                    this.$router.push('/vanhire/' + record.vanhire_id + '/checkin');
                    break;
                case 30:
                    this.$router.push('/vanhire/' + record.vanhire_id + '/refund');
                    break;
                case 40:
                    this.$router.push('/vanhire/' + record.vanhire_id + '/dashboard');
                    break;
            }
        },
        findCheckout (ctx) {
            let promise = api.get('/vanhire/list', {results_per_page: this.checkout.perPage, current_page: this.checkout.currentPage, state: 10, sort: this.checkout.sortBy, desc: this.checkout.sortDesc ? 1 : 0})

            return promise.then((data) => {
                const items = data.items
                this.checkout.totalRows = parseInt(data.pages.total)
                return(items)
            }).catch(error => {
                return []
            })
        },
        findCheckin (ctx) {
            let promise = api.get('/vanhire/list', {results_per_page: this.checkin.perPage, current_page: this.checkin.currentPage, state: 20, sort: this.checkin.sortBy, desc: this.checkin.sortDesc ? 1 : 0})

            return promise.then((data) => {
                const items = data.items
                this.checkin.totalRows = parseInt(data.pages.total)
                return(items)
            }).catch(error => {
                return []
            })
        },
        findRefund (ctx) {
            let promise = api.get('/vanhire/list', {results_per_page: this.refund.perPage, current_page: this.refund.currentPage, state: 30, sort: this.refund.sortBy, desc: this.refund.sortDesc ? 1 : 0})

            return promise.then((data) => {
                const items = data.items
                this.refund.totalRows = parseInt(data.pages.total)
                return(items)
            }).catch(error => {
                return []
            })
        },
        findCompleted (ctx) {
            let promise = api.get('/vanhire/list', {results_per_page: this.completed.perPage, current_page: this.completed.currentPage, state: 40, sort: this.completed.sortBy, desc: this.completed.sortDesc ? 1 : 0})

            return promise.then((data) => {
                const items = data.items
                this.completed.totalRows = parseInt(data.pages.total)
                return(items)
            }).catch(error => {
                return []
            })
        }
    },
}