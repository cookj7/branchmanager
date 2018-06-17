import api from '@/services/api'

export default {
    name: 'main-dashboard',
    data: function() {
        return {
            loading: false,
            statistics: {
                vanhire: {
                    initialised: 0,
                    approved: 0,
                    checkout: 0,
                    checkin: 0,
                    completed: 0
                },
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
                bookings: {
                    pending: 0,
                    approved: 0,
                },
            }
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
        compliance(name) {
            this.$router.push('/compliance/' + name)
        },
        getStatistics: function() {
            return api.get('/vanhire/statistics', {}).then((result)=> {
                for (let statistic of result) {
                    switch (statistic.vanhire_state_id) {
                        case '1':
                            this.statistics.vanhire.initialised = parseInt(statistic.total);
                            break;
                        case '10':
                            this.statistics.vanhire.approved = parseInt(statistic.total);
                            break;
                        case '20':
                            this.statistics.vanhire.checkout = parseInt(statistic.total);
                            break;
                        case '30':
                            this.statistics.vanhire.checkin = parseInt(statistic.total);
                            break;
                        case '40':
                            this.statistics.vanhire.completed = parseInt(statistic.total);
                            break;
                    }
                }

                return result
            })
        },
        getComplianceStatistics: function() {
            return api.get('/vanhire/compliance/statistics', {}).then((result)=> {
                if (!!result.vanhire) {
                    for (let statistic of result.vanhire) {
                        switch (statistic.vanhire_state_id) {
                            case '1':
                                this.statistics.bookings.pending = parseInt(statistic.total);
                                break;
                            case '10':
                                this.statistics.bookings.approved = parseInt(statistic.total);
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
    created: function() {
        this.loading = true
        let promises = [
            this.getStatistics(),
            this.getComplianceStatistics(),
        ]
        Promise.all(promises).then((result) => {
            this.loading = false
        }).catch((error) => {
            //this.$router.push('/')
        })
    }
}