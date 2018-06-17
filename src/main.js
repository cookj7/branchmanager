/*
 Adds the promise polyfill for IE 11
 */
require('es6-promise').polyfill();

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import store from './store'
import VueLocalStorage from './plugins/localstorage/'
import VeeValidate from 'vee-validate';
import DatePicker from 'vue2-datepicker';
import Toastr from 'vue-toastr';
require('vue-toastr/src/vue-toastr.scss');

Vue.use(Toastr);

Vue.use(DatePicker);

// Add bootstrap vue
Vue.use(BootstrapVue)

// add validation library
Vue.use(VeeValidate, { fieldsBagName: 'veeFields' });

// Add local-storage
Vue.use(VueLocalStorage)


/* eslint-disable no-new */
new Vue({
    el: '#app',
    store: store,
    router,
    template: '<App/>',
    components: {
        App,
    },
    created: function () {
        //console.log('created')
        //this.$store.dispatch('security/initialise')
    }
})
