import Vue from 'vue'
import Router from 'vue-router'

// authentication
import store from '@/store/'

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'

// Views - vanhire
import { VanhireDashboard, VanhireCheckin, VanhireCheckinItem, VanhireCheckout, VanhireCheckoutItem, VanhireRefund, VanhireRefundItem } from '@/views/vanhire'

// Views - compliance
import { ComplianceDashboard, ComplianceApproveDocuments, ComplianceApproveRefund, ComplianceApproveDocumentItem } from '@/views/compliance'

// Views - compliance
import { AccountDashboard } from '@/views/account'

// security pages
import Login from '@/views/security/Login/Login.vue'
import Page404 from '@/views/security/Page404'
import Page500 from '@/views/security/Page500'

Vue.use(Router)

const router = new Router({
    mode: 'hash',
    linkActiveClass: 'open active',
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            path: '/',
            redirect: '/dashboard',
            name: 'Home',
            component: Full,
            children: [
                {
                    path: 'dashboard',
                    name: 'Dashboard',
                    component: Dashboard
                },
                {
                    path: 'vanhire',
                    redirect: '/vanhire/dashboard',
                    name: 'Vanhire',
                    component: {
                        render (c) { return c('router-view') }
                    },
                    children: [
                        {
                            path: 'dashboard',
                            name: 'VanhireDashboard',
                            component: VanhireDashboard
                        },
                        {
                            path: 'checkin',
                            name: 'Checkin',
                            component: VanhireCheckin
                        },
                        {
                            path: ':id/checkin',
                            name: 'Checkin Item',
                            component: VanhireCheckinItem,
                            props: true
                        },
                        {
                            path: ':id/checkin/:cid',
                            name: 'Edit Checkin Item',
                            component: VanhireCheckinItem,
                            props: true
                        },
                        {
                            path: 'checkout',
                            name: 'Checkout',
                            component: VanhireCheckout
                        },
                        {
                            path: ':id/checkout',
                            name: 'Checkout Item',
                            component: VanhireCheckoutItem,
                            props: true
                        },
                        {
                            path: ':id/checkout/:cid',
                            name: 'Edit Checkout Item',
                            component: VanhireCheckoutItem,
                            props: true
                        },
                        {
                            path: 'refund',
                            name: 'Refund',
                            component: VanhireRefund
                        },
                        {
                            path: ':id/refund',
                            name: 'Refund Item',
                            component: VanhireRefundItem,
                            props: true
                        },
                    ]
                },
                {
                    path: 'compliance',
                    redirect: '/compliance/dashboard',
                    name: 'Compliance',
                    component: {
                        render (c) { return c('router-view') }
                    },
                    children: [
                        {
                            path: 'dashboard',
                            name: 'Compliance Dashboard',
                            component: ComplianceDashboard
                        },
                        {
                            path: 'approve-documents',
                            name: 'Approve Documents',
                            component: ComplianceApproveDocuments
                        },
                        {
                            path: 'approve-documents/:id',
                            name: 'Approve Document',
                            props: true,
                            component: ComplianceApproveDocumentItem
                        },
                        {
                            path: 'approve-refund',
                            name: 'Approve Refund',
                            component: ComplianceApproveRefund
                        },
                    ]
                },
                {
                    path: 'account',
                    redirect: '/account/dashboard',
                    name: 'Account',
                    component: {
                        render (c) { return c('router-view') }
                    },
                    children: [
                        {
                            path: 'dashboard',
                            name: 'AccountDashboard',
                            component: AccountDashboard
                        },
                        {
                            path: 'settings',
                            name: 'AccountSettings',
                            component: AccountDashboard
                        },
                    ]
                },

            ]
        },
        {
            path: '/security',
            redirect: '/security/404',
            name: 'Security',
            meta: {anonymous: true},
            component: {
                render (c) {
                    return c('router-view')
                }
            },
            children: [
                {
                    path: '404',
                    name: 'Page404',
                    component: Page404
                },
                {
                    path: '500',
                    name: 'Page500',
                    component: Page500
                },
                {
                    path: 'login',
                    name: 'Login',
                    component: Login
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    // security route
    if (!to.matched.some(record => record.meta.anonymous)) {
        if (store.getters['security/initialised'] !== true) {
            store.dispatch('security/initialise')
        }

        if (store.getters['security/logged'] !== true) {
            next({
                path: '/security/login',
                query: {
                    redirect: to.fullPath,
                },
            });
            return;
        }
    }

    next();
})

export default router
