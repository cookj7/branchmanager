import { Loader } from '@/components/'

export default {
    name: 'vanhire-checkout-item',
    components: {
        Loader,
    },
    data: function(){
        return {
            loading: false,
            yesNoOptions: [
                {text: 'Yes ',value: '1'},
                {text: 'No ',value: '0'},
            ],
            okOptions: [
                {text: 'OK',value: '1'},
                {text: 'Not OK ',value: '0'},
            ],
            vans: [
                {text: 'VANA REG', value: 'VANA REG'},
                {text: 'VANB REG', value: 'VANB REG'},
                {text: 'VANC REG', value: 'VANC REG'},
            ]
        }
    },
    methods: {
        getTimeOptions: function() {
            let options = []
            for(let i=8; i<=17; i++) {
                options.push({text: i + ':00', value: i + ':00'})
                options.push({text: i + ':30', value: i + ':30'})
            }

            return options
        }
    },
    created: function() {
        this.loading = true
        this.loading = false
    }
}