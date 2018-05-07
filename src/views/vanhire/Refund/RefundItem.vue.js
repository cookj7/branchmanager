import { Loader } from '@/components/'
import api from '@/services/api'

export default {
    name: 'vanhire-refund-item',
    components: {
        Loader,
    },
    computed: {
        customerName: function() {
            return this.vanhire.v_forename + ' ' + this.vanhire.v_surname;
        },
        bookingReference: function() {
            return '@todo retrieve customer id';
        },
        telephoneNumber: function() {
            return this.vanhire.v_telephone1 + (!!this.vanhire.v_telephone2 ? " / " + this.vanhire.v_telephone2 : "");
        },
        amountPaid: function() {
            return '£' + this.vanhire.v_deposit.toLocaleString('en-gb');
        },
        dateDue: function() {
            return this.vanhire.v_end;
        },
    },
    data: function(){
        return {
            vanhireId: this.$route.params.id,
            loading: false,
            request: {
                saving: false,
                failed: false,
                completed: false,
                message: ''
            },
            vans: [],
            vanhire: {
                v_email: '',
                v_forename: '',
                v_surname: '',
                v_address1: '',
                v_address2: '',
                v_address3: '',
                v_address4: '',
                v_postcode: '',
                v_telephone1: '',
                v_telephone2: '',
                v_dob: '',
                v_license: '',
                vanhire_van_id: null,
                v_license_confirmed: 0,
                v_leaving_vehicle: 0,
                v_customer_reg: '',
                v_deposit: 0,
                v_start: '',
                v_end: '',
            },
            refund: {
                vr_amount: '',
                vr_card_last: '',
                vr_notes: '',
            },
        }
    },
    methods: {
        validate: async function() {
            this.errors.clear();

            return this.$validator.validate('*').then((result) => {
                if(!result) {
                    this.scrollToFirstError();
                    return false;
                }

                return true;
            }).catch(() => {
                return false;
            });
        },

        scrollToFirstError() {
            Vue.nextTick(() => {
                let element = document.querySelector('.is-invalid');
                if (!element) {
                    return;
                }

                let domRect = element.getBoundingClientRect();

                // scroll to first error
                window.scroll({
                    top: domRect.top + document.documentElement.scrollTop - 60,
                    behavior: "smooth"
                });
            })
        },

        saveRefund: async function() {
            return api.post('/vanhire/' + this.vanhireId + '/refund/create', this.refund).then((result) => {
                return result
            })
        },

        createRefund: async function() {
            let passed = await this.validate();

            if (!passed) {
                return;
            }

            try {
                this.request.saving = true;
                this.request.failed = false;
                await this.saveRefund();

                this.request.saving = false;
                this.request.completed = true;
            } catch (error) {
                this.request.message = 'Unknown Reason';
                if (error.response) {
                    switch(error.response.status) {
                        case 403:
                            this.request.message = 'You are not permitted to create a new refund - has the vehicle been checked in? Or has the refund already been made?';
                            break;
                        case 400:
                            this.request.message = 'Validation issue - please check form and re-submit.';
                            if (!!error.response.data && !!error.response.data.validation) {
                                this.errors.clear();
                                Object.keys(error.response.data.validation).forEach((key) => {
                                    Object.keys(error.response.data.validation[key]).forEach((type) => {
                                        this.errors.add(key, error.response.data.validation[key][type]);
                                    });
                                });

                                this.scrollToFirstError();
                            }
                            break;
                    }
                }
                this.request.saving = false;
                this.request.failed = true;
            }
        },

        reset: function() {
            this.refund.vr_amount = this.vanhire.v_deposit;
            this.refund.vr_notes = '';
            this.refund.vr_card_last = '';
        },

        getVans: function() {
            return api.get('/vanhire/van/list', {}).then((result)=> {
                this.vans = result.map((vanData) => {
                    return {
                        text: vanData.vv_reg,
                        value: vanData.vanhire_van_id,
                    }
                })

                return result
            })
        },

        getVanhire: function() {
            return api.get('/vanhire/' + this.vanhireId + '/show', {}).then((vanhire) => {
                Object.keys(this.vanhire).forEach((key) => {
                    if (key in vanhire) {
                        this.vanhire[key] = vanhire[key];
                    }
                });

                if (!vanhire.vanhire_state_id || vanhire.vanhire_state_id < 30 || !vanhire.checkin) {
                    throw "Van has not been checked out - unable to check-in";
                }

                if (!!vanhire.refund) {
                    Object.keys(this.refund).forEach((key) => {
                        if (key in vanhire.refund) {
                            this.refund[key] = vanhire.refund[key];
                        }
                    });

                    this.request.completed = true;
                    return vanhire;
                }

                this.reset();

                return vanhire
            })
        },

    },
    created: function() {
        this.loading = true
        let promises = [
            this.getVanhire(),
            this.getVans(),
        ]
        Promise.all(promises).then((result) => {
            this.loading = false
        }).catch((error) => {
            this.$router.push('/vanhire/refund')
        })
    }}