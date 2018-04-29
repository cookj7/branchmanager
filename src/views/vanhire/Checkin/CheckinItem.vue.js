import { Loader } from '@/components/'
import api from '@/services/api'

export default {
    name: 'vanhire-checkin-item',
    components: {
        Loader,
    },
    data: function(){
        return {
            vanhireId: this.$route.params.id,
            loading: false,
            yesNoOptions: [
                {text: 'Yes ',value: '1'},
                {text: 'No ',value: '0'},
            ],
            okOptions: [
                {text: 'OK',value: '1'},
                {text: 'Not OK ',value: '0'},
            ],
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
            checkin: {
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

                if (!vanhire.vanhire_state_id || vanhire.vanhire_state_id != 20 || !vanhire.checkout) {
                    throw "illegal vanhire state";
                }

                Object.keys(this.checkout).forEach((key) => {
                    if (key in vanhire.checkout) {
                        this.checkout[key] = vanhire.checkout[key];
                    }
                });

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
            console.log(error);
            this.$router.push('/vanhire/checkin')
        })
    }}