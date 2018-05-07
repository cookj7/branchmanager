import { Loader } from '@/components/'
import api from '@/services/api'

export default {
    name: 'vanhire-checkout-item',
    components: {
        Loader,
    },
    data: function(){
        return {
            loading: false,
            summaryFields: [
                {key: 'information'},
                {key: 'value'},
            ],
            request: {
                saving: false,
                failed: false,
                completed: false,
                message: ''
            },
            yesNoOptions: [
                {text: 'Yes ',value: 1},
                {text: 'No ',value: 0},
            ],
            okOptions: [
                {text: 'OK',value: 1},
                {text: 'Not OK ',value: 0},
            ],
            vanhire_pristine: null,
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
            checkout: {
                vc_condition_body: '',
                vc_condition_wipers: '',
                vc_condition_windscreen: '',
                vc_condition_tyres: '',
                vc_condition_sparewheel: '',
                vc_condition_taillift: '',
                vc_oil_level: 1,
                vc_coolant_level: 1,
                vc_screenwash_level: 1,
                vc_brake_fluid: 1,
                vc_powersteering_fluid: 1,
                vc_battery_condition: 1,
                vc_oil_water_leaks: 1,
                vc_toolkit: 1,
                vc_satnav: 1,
            },
            vanhireId: this.$route.params.id
        }
    },
    computed: {
        isLeavingCar: function() {
            return this.vanhire.v_leaving_vehicle == 1;
        },
        summaryItems: function() {
            let items = [];

            items.push({information: 'Name: ', value: this.vanhire.v_forename + ' ' + this.vanhire.v_surname});
            items.push({information: 'Email: ', value: this.vanhire.v_email});
            items.push({information: 'Address: ', value: (this.vanhire.v_address1 + ' ' + this.vanhire.v_address2 + ', ' + this.vanhire.v_address3 +  ', ' + this.vanhire.v_address4 + ', ' + this.vanhire.v_postcode).replace(/([,][ ]?)+/g, ', ')});
            items.push({information: 'Telephone (primary): ', value: this.vanhire.v_telephone1});
            items.push({information: 'Telephone (secondary): ', value: this.vanhire.v_telephone2});
            items.push({information: 'Date of birth: ', value: this.vanhire.v_dob.replace(/^([\d]{4}[-][\d]{2}[-][\d]{2}).*$/, '$1')});
            items.push({information: 'License: ', value: this.vanhire.v_license});
            items.push({information: 'License confirmed', value: this.vanhire.v_license_confirmed == 1 ? 'YES' : 'NO'});
            const van = this.vans.find((item) => item.value === this.vanhire.vanhire_van_id);
            if (!!van) {
                items.push({information: 'Van registration: ', value: van.text});
            }
            items.push({information: 'Leaving vehicle: ', value: this.vanhire.v_leaving_vehicle == 1 ? 'Yes (' + this.vanhire.v_customer_reg + ')' : 'No'});
            items.push({information: 'Deposit: ', value: '£' + this.vanhire.v_deposit.toLocaleString('en-gb')});
            items.push({information: 'Check-out date/time: ', value: this.vanhire.v_start});
            items.push({information: 'Expected check-in date/time: ', value: this.vanhire.v_end});

            items.push({information: 'Condition of vehicle bodywork, windscreen, windows, lights', value: this.checkout.vc_condition_body});
            items.push({information: 'Condition of vehicle windscreen wiper blades', value: this.checkout.vc_condition_wipers});
            items.push({information: 'Cleanliness of windscreen, windows mirrors, lights', value: this.checkout.vc_condition_windscreen});
            items.push({information: 'Condition of tyres, tyre pressure, tyre wear', value: this.checkout.vc_condition_tyres});
            items.push({information: 'Condition of spare wheel and jack', value: this.checkout.vc_condition_sparewheel});
            items.push({information: 'Functionality of tail lift', value: this.checkout.vc_condition_taillift});

            items.push({information: 'Engine oil level', value: this.checkout.vc_oil_level == 1 ? 'OK' : 'NOT OK'});
            items.push({information: 'Coolant level', value: this.checkout.vc_coolant_level == 1 ? 'OK' : 'NOT OK'});
            items.push({information: 'Windscreen wash level', value: this.checkout.vc_screenwash_level == 1 ? 'OK' : 'NOT OK'});
            items.push({information: 'Brake/clutch fluid level', value: this.checkout.vc_brake_fluid == 1 ? 'OK' : 'NOT OK'});
            items.push({information: 'Power steering level', value: this.checkout.vc_powersteering_fluid == 1 ? 'OK' : 'NOT OK'});
            items.push({information: 'Condition of battery', value: this.checkout.vc_battery_condition == 1 ? 'OK' : 'NOT OK'});
            items.push({information: 'Oil or water leaks', value: this.checkout.vc_oil_water_leaks == 1 ? 'OK' : 'NOT OK'});

            items.push({information: 'Tool kit', value: this.checkout.vc_toolkit == 1 ? 'YES' : 'NO'});
            items.push({information: 'Sat. Nav.', value: this.checkout.vc_satnav == 1 ? 'YES' : 'NO'});
            return items;
        }
    },
    methods: {
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

                this.vanhire_pristine = vanhire;

                if (!vanhire.vanhire_state_id || vanhire.vanhire_state_id < 10) {
                    throw "Van hire has not passed approval";
                }


                if (!!vanhire.checkout) {
                    this.request.completed = true;
                    Object.keys(this.checkout).forEach((key) => {
                        if (key in vanhire.checkout) {
                            this.checkout[key] = vanhire.checkout[key];
                        }
                    });

                }

                return vanhire
            })
        },

        reset: function() {
            Object.keys(this.vanhire).forEach((key) => {
                if (key in this.vanhire_pristine) {
                    this.vanhire[key] = this.vanhire_pristine[key];
                }
            });

            this.checkout.vc_condition_body = '';
            this.checkout.vc_condition_wipers = '';
            this.checkout.vc_condition_windscreen = '';
            this.checkout.vc_condition_tyres = '';
            this.checkout.vc_condition_sparewheel = '';
            this.checkout.vc_condition_taillift = '';
            this.checkout.vc_oil_level = 1;
            this.checkout.vc_coolant_level = 1;
            this.checkout.vc_screenwash_level = 1;
            this.checkout.vc_brake_fluid = 1;
            this.checkout.vc_powersteering_fluid = 1;
            this.checkout.vc_battery_condition = 1;
            this.checkout.vc_oil_water_leaks = 1;
            this.checkout.vc_toolkit = 1;
            this.checkout.vc_satnav = 1;
        },

        validate: async function() {
            this.errors.clear();

            return this.$validator.validate('*').then((result) => {
                if (!this.vanhire.v_dob) {
                    this.errors.add('v_dob', 'You must enter a date of birth for the customer');
                    result = false;
                }

                if (!this.vanhire.v_start) {
                    this.errors.add('v_start', 'You must enter the checkout date/time for the vehicle');
                    result = false;
                }

                if (!this.vanhire.v_end) {
                    this.errors.add('v_end', 'You must enter an expected return date/time for the vehicle');
                    result = false;
                }

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

        saveVanhire: async function() {
            return api.put('/vanhire/' + this.vanhireId + '/update', this.vanhire).then((result) => {
                return result
            })
        },

        saveCheckout: async function() {
            return api.post('/vanhire/' + this.vanhireId + '/checkout/create', this.checkout).then((result) => {
                return result
            })
        },

        createCheckout: async function() {
            let passed = await this.validate();

            if (!passed) {
                return;
            }

            try {
                this.request.saving = true;
                this.request.failed = false;
                await this.saveVanhire();
                await this.saveCheckout();

                this.request.saving = false;
                this.request.completed = true;
            } catch (error) {
                this.request.message = 'Unknown Reason';
                if (error.response) {
                    switch(error.response.status) {
                        case 403:
                            this.request.message = 'You are not permitted to create a new checkout - is there already a checkout saved for this customer? ';
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
        }
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
            this.$router.push('/vanhire/checkout')
        })
    }
}