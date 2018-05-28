import { Loader } from '@/components/'
import api from '@/services/api'

export default {
    name: 'compliance-approve-document-item',
    components: {
        Loader,
    },
    data: function() {
        return {
            loading: false,
            vanhireId: this.$route.params.id,
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
            documents: [],
            reasons: [],
            selectedReasonId: null,
            summaryFields: [
                {key: 'information'},
                {key: 'value'},
            ],
        }
    },
    computed: {
        summaryItems: function() {
            let items = [];

            items.push({information: 'Name: ', value: this.vanhire.v_forename + ' ' + this.vanhire.v_surname});
            items.push({information: 'Email: ', value: this.vanhire.v_email});
            items.push({information: 'Address: ', value: (this.vanhire.v_address1 + ' ' + this.vanhire.v_address2 + ', ' + this.vanhire.v_address3 +  ', ' + this.vanhire.v_address4 + ', ' + this.vanhire.v_postcode).replace(/([,][ ]?)+/g, ', ')});
            items.push({information: 'Telephone (primary): ', value: this.vanhire.v_telephone1});
            items.push({information: 'Telephone (secondary): ', value: this.vanhire.v_telephone2});
            items.push({information: 'Date of birth: ', value: this.vanhire.v_dob.replace(/^([\d]{4}[-][\d]{2}[-][\d]{2}).*$/, '$1')});
            items.push({information: 'License: ', value: this.vanhire.v_license});
            items.push({information: 'Check-out date/time: ', value: this.vanhire.v_start});
            items.push({information: 'Expected check-in date/time: ', value: this.vanhire.v_end});
            return items;
        },
    },
    methods: {
        validate: async function() {
            this.errors.clear();

            return this.$validator.validate('*').then((result) => {
                if (!this.vanhire.v_end) {
                    this.errors.add('v_end_actual', 'You must enter the actual return date/time for the vehicle');
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
        isDocument(item) {
            return !!item.type && !!item.type.extension;
        },
        isDocumentPending(item) {
            return !this.isDocumentAccepted(item) && !this.isDocumentRejected(item);
        },
        isDocumentRejected(item) {
            return !!item.status && item.status.id == 600;
        },
        isDocumentAccepted(item) {
            return !!item.status && item.status.id == 200;
        },
        getDownloadUrl(item) {
            return process.env.API_HOST + '/vanhire/' + this.vanhireId + '/document/' + item.id + '/download';
        },
        getViewUrl(item) {
            return process.env.API_HOST + '/vanhire/' + this.vanhireId + '/document/' + item.id + '/download?inline=true';
        },
        setStatus(document, type) {
            const reject = type === 'reject';
            if (reject && null == document.rejectionId) {
                document.invalid = true;
                return;
            }

            let params = reject ? {vanhire_document_rejection_reason_id: document.rejectionId} : {};
            document.invalid = false;

            return api.put('/vanhire/' + this.vanhireId + '/document/' + document.id + '/' + type, params).then((data) => {
                document.status.id = data.vanhire_document_status_id;
                if (!reject) {
                    document.rejectionId = null;
                }
                return data;
            });
        },
        getReasons: function() {
            return api.get('/vanhire/document/rejection/list', {}).then((result)=> {
                this.reasons = result.map((reason) => {
                    return {
                        value: reason.vanhire_document_rejection_reason_id,
                        text: reason.vdrr_description,
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

                if (!!vanhire.document) {
                    this.documents = vanhire.document.map((data) => {
                        return {
                            type: !data.document_type ? {} : {
                                id: data.document_type.document_type_id,
                                extension: data.document_type.dt_ext,
                                folder: data.document_type.dt_folder == 1,
                                header: data.document_type.dt_header,
                                preview: data.document_type.dt_preview == 1,
                                locked: data.document_type.dt_protected == 1,
                            },
                            category: {
                                id: data.vanhire_document_category.vanhire_document_category_id,
                                name: data.vanhire_document_category.vdc_name,
                            },
                            id: data.vanhire_document_id,
                            status: {
                                id: data.vanhire_document_status.vanhire_document_status_id,
                                name: data.vanhire_document_status.vds_name,
                            },
                            rejectionId: data.vanhire_document_rejection_reason_id,
                            reference: data.vd_reference,
                            saving: false,
                            invalid: false,
                        }
                    });
                }

                return vanhire
            })
        },
    },
    created: function() {
        this.loading = true;
        let promises = [
            this.getVanhire(),
            this.getReasons(),
        ];
        Promise.all(promises).then((result) => {
            this.loading = false;
        }).catch((error) => {
            this.$router.push('/compliance/approve-documents');
        })
    }
}
