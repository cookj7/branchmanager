import api from '@/services/api'

export default {
    name: 'vanhire-checkout',
    data: function() {
        return {
            items: [
                {"basket_id":"11183","b_forename":"TEST","b_surname":"TEST","b_postcode":"CB21","b_address1":"1","b_address2":"88","created":"1507468588","pickup":"1507534200","dropoff":"1507534200"},
                {"basket_id":"11185","b_forename":"TEST","b_surname":"TEST","b_postcode":"CB21","b_address1":"1","b_address2":"88","created":"1507471563","pickup":"1507534200","dropoff":"1507534200"},
                {"basket_id":"11184","b_forename":"TEST","b_surname":"TEST","b_postcode":"CB21","b_address1":"1","b_address2":"88","created":"1507471345","pickup":"1507620600","dropoff":"1507620600"},
                {"basket_id":"11193","b_forename":"TEST","b_surname":"TEST","b_postcode":"CB21","b_address1":"1","b_address2":"88","created":"1508000189","pickup":"1508311800","dropoff":"1508311800"},
            ],
            fields: [
                {key: 'basket_id', label: 'Order Reference'},
                {key: 'name'},
                {key: 'b_forename', label: 'Forename'},
                {key: 'b_surname', label: 'Surname'},
                {key: 'b_postcode', label: 'Postcode'}
            ],
            currentPage: 1,
            perPage: 5,
            totalRows: 0,
        }
    },
    methods: {
        getBadge (status) {
            return status === 'Active' ? 'success'
                : status === 'Inactive' ? 'secondary'
                : status === 'Pending' ? 'warning'
                : status === 'Banned' ? 'danger' : 'primary'
        },
        getRowCount (items) {
            return items.length
        },
        myProvider (ctx) {
            // Here we don't set isBusy prop, so busy state will be handled by table itself
            // this.isBusy = true
            let promise = api.get('/vanhire/checkin/awaiting', {results_per_page: this.perPage, current_page: this.currentPage})

            return promise.then((data) => {

                console.log(data)
                const items = data.items
                this.totalRows = parseInt(data.pages.total)
                // Here we could override the busy state, setting isBusy to false
                // this.isBusy = false
                return(items)
            }).catch(error => {
                // Here we could override the busy state, setting isBusy to false
                // this.isBusy = false
                // Returning an empty array, allows table to correctly handle busy state in case of error
                return []
            })
        }
    },
}