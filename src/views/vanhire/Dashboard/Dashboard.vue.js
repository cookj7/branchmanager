import api from '@/services/api'

export default {
    name: 'vanhire-dashboard',
    data: function() {
        return {
            loading: false,
            statistics: {
                initialised: 0,
                approved: 0,
                checkout: 0,
                checkin: 0,
                completed: 0
            },
            vanhire: {
                sortBy: 'v_start',
                sortDesc: true,
                items: [
                ],
                fields: [
                    {key: 'basket_id', label: 'Order Reference', sortable: true},
                    {key: 'b_name', label: "branch", sortable: true, formatter: (value) => { return value.charAt(0).toUpperCase() + value.slice(1) }},
                    {key: 'name', sortable: true},
                    {key: 'v_start', label: 'start', sortable: true},
                    {key: 'v_end', label: 'end', sortable: true},
                    {key: 'v_postcode', label: 'Postcode', sortable: true},
                    {key: 'state', label: 'State', sortable: true}
                ],
                filterState: '',
                currentPage: 1,
                perPage: 20,
                totalRows: 0,
            },
            pageOptions: [ 10, 20, 25, 50 ],
            filterOptions: [
                {text: 'No Filter', value: ''},
                {text: 'Awaiting Check-out', value: JSON.stringify([1, 10])},
                {text: 'Awaiting Check-in', value: JSON.stringify([20])},
                {text: 'Awaiting Refund', value: JSON.stringify([30])},
                {text: 'Completed', value: JSON.stringify([40])},
            ]
        }
    },
    methods: {
        getStateData(stateId) {
            switch(parseInt(stateId)) {
                case 1: case 10: return {text: 'Awaiting Check-out', style: 'warning'};
                case 20: return {text: 'Awaiting Check-in', style: 'primary'};
                case 30: return {text: 'Awaiting Refund', style: 'danger'};
                case 40: return {text: 'Completed', style: 'success'};
            }

            return {text: 'unknown', style: 'primary'};
        },
        category(name) {
            this.$router.push('/vanhire/' + name)
        },
        view (record) {
            if (!record && !record.vanhire_id) {
                return;
            }

            switch (parseInt(record.vanhire_state_id)) {
                case 1: case 10:
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
        find (ctx) {
            let data = {results_per_page: this.vanhire.perPage, current_page: this.vanhire.currentPage, sort: this.vanhire.sortBy, desc: this.vanhire.sortDesc ? 1 : 0};
            if (!!this.vanhire.filterState) {
                data.state = JSON.parse(this.vanhire.filterState);
            }
            let promise = api.get('/vanhire/list', data)

            return promise.then((data) => {
                const items = data.items
                this.vanhire.totalRows = parseInt(data.pages.total)
                return(items)
            }).catch(error => {
                return []
            })
        },
        getStatistics: function() {
            return api.get('/vanhire/statistics', {}).then((result)=> {
                for (let statistic of result) {
                    switch (statistic.vanhire_state_id) {
                        case '1':
                            this.statistics.initialised = parseInt(statistic.total);
                            break;
                        case '10':
                            this.statistics.approved = parseInt(statistic.total);
                            break;
                        case '20':
                            this.statistics.checkout = parseInt(statistic.total);
                            break;
                        case '30':
                            this.statistics.checkin = parseInt(statistic.total);
                            break;
                        case '40':
                            this.statistics.completed = parseInt(statistic.total);
                            break;
                    }
                }

                return result
            })
        },
    },
    created: function() {
        this.loading = true
        let promises = [
            this.getStatistics(),
        ]
        Promise.all(promises).then((result) => {
            this.loading = false
        }).catch((error) => {
            this.$router.push('/')
        })
    }
}