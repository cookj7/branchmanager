import api from '@/services/api'

export default {
    name: 'compliance-approve-documents',
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
        view (record) {
            if (!record && !record.vanhire_id) {
                return;
            }

            this.$router.push('/compliance/approve-documents/' + record.vanhire_id);
        },
        findApproval (ctx) {
            let promise = api.get('/vanhire/list', {results_per_page: this.approval.perPage, current_page: this.approval.currentPage, documents: true, sort: this.approval.sortBy, desc: this.approval.sortDesc ? 1 : 0})

            return promise.then((data) => {
                const items = data.items
                this.approval.totalRows = parseInt(data.pages.total)
                return(items)
            }).catch(error => {
                return []
            })
        }
    },
    data: () => {
        return {
            approval: {
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
            items: [

            ],
            fields: [
                {key: 'name'},
                {key: 'start', label: 'Hire Date'},
                {key: 'branch'},
                {key: 'status'}
            ],
            currentPage: 1,
            perPage: 5,
            totalRows: 0
        }
    },
}