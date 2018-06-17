import api from '@/services/api'

export default {
    name: 'compliance-dashboard',
    data: function() {
        return {
            loading: false,
            statistics: {
                refunds: {
                    open: 0,
                    awaiting: 0,
                },
                documents: {
                    approved: 0,
                    rejected: 0,
                    awaiting: 0,
                },
                vans: {
                    checkedOut: 0,
                    checkedIn: 0,
                },
                vanhire: {
                    pending: 0,
                    approved: 0,
                },
            },
            compliance: {
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
                    {key: 'pending', label: 'Pending', sortable: false},
                    {key: 'reviewed', label: 'Reviewed', sortable: false},
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
        getPending(record) {
            return 0;
        },
        getApproved(record) {
            return 0;
        },
        getRejected(record) {
            return 0;
        },
        getStateData(stateId) {
            switch(parseInt(stateId)) {
                case 1: return {text: 'created', style: 'warning'};
                case 10: return {text: 'approved', style: 'success'};
            }

            return {text: 'unknown', style: 'primary'};
        },
        view (record) {
            if (!record && !record.vanhire_id) {
                return;
            }
            this.$router.push('/compliance/approve-documents/' + record.vanhire_id);

            //switch (parseInt(record.vanhire_state_id)) {
            //    case 1: case 10:
            //    this.$router.push('/vanhire/' + record.vanhire_id + '/checkout');
            //    break;
            //    case 20:
            //        this.$router.push('/vanhire/' + record.vanhire_id + '/checkin');
            //        break;
            //    case 30:
            //        this.$router.push('/vanhire/' + record.vanhire_id + '/refund');
            //        break;
            //    case 40:
            //        this.$router.push('/vanhire/' + record.vanhire_id + '/dashboard');
            //        break;
            //}
        },
        find (ctx) {
            let data = {results_per_page: this.compliance.perPage, current_page: this.compliance.currentPage, sort: this.compliance.sortBy, desc: this.compliance.sortDesc ? 1 : 0};
            if (!!this.compliance.filterState) {
                data.state = JSON.parse(this.compliance.filterState);
            }
            let promise = api.get('/vanhire/compliance/list', data)

            return promise.then((data) => {
                const items = data.items
                this.compliance.totalRows = parseInt(data.pages.total)
                return(items)
            }).catch(error => {
                return []
            })
        },
        getStatistics: function() {
            return api.get('/vanhire/compliance/statistics', {}).then((result)=> {
                if (!!result.vanhire) {
                    for (let statistic of result.vanhire) {
                        switch (statistic.vanhire_state_id) {
                            case '1':
                                this.statistics.vanhire.pending = parseInt(statistic.total);
                                break;
                            case '10':
                                this.statistics.vanhire.approved = parseInt(statistic.total);
                                break;
                        }
                    }
                }

                if (!!result.van) {
                    for (let vanStatistics of result.van) {
                        switch (vanStatistics.state) {
                            case 'in':
                                this.statistics.vans.checkedIn = parseInt(vanStatistics.total);
                                break;
                            case 'out':
                                this.statistics.vans.checkedOut = parseInt(vanStatistics.total);
                                break;
                        }
                    }
                }

                if (!!result.documents) {
                    for (let documentStatistics of result.documents) {
                        switch (documentStatistics.vanhire_document_status_id) {
                            case '1':
                                this.statistics.documents.awaiting = parseInt(documentStatistics.total);
                                break;
                            case '200':
                                this.statistics.documents.approved = parseInt(documentStatistics.total);
                                break;
                            case '600':
                                this.statistics.documents.rejected = parseInt(documentStatistics.total);
                                break;
                        }
                    }
                }

                return result
            })
        },
    },
    created: function () {
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