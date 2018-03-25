import Vue from 'vue'
import Router from 'vue-router'

// authentication
import store from '@/store/'

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'

// security pages
import Login from '@/views/security/Login/Login.vue'
import Page404 from '@/views/security/Page404'
import Page500 from '@/views/security/Page500'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
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
        }

      ]
    },
    {
      path: '/security',
      redirect: '/security/404',
      name: 'Security',
      meta: {anonymous: true},
      component: {
        render (c) { return c('router-view') }
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
        if (!store.getters['security/user'].logged) {
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
