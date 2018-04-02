import { EventBus } from '@/plugins/eventbus/'

export default {
    name: 'header-dropdown',
    data: () => {
        return { itemsCount: 42 }
    },
    methods: {
        logout: function () {
            EventBus.$emit('security-logout');
        }
    },
}