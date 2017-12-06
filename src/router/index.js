import Vue from 'vue'
import Router from 'vue-router'
import auth from '../auth'
import {leadUserList, login, lead, addLeadUser, dataAnalytics, periodLists} from '../pages/index'

Vue.use(Router)

export const router = new Router({
  linkActiveClass: 'item-selected',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: { noAuth: true }
    },
    {
      path:'/lead',
      component: lead,
      children:[
        {
          path: 'add',
          name: 'add',
          component: addLeadUser
        },
        {
          path: 'list',
          name: 'leadUserlist',
          component: leadUserList
        },
        {
          path: 'analytics',
          component: dataAnalytics
        },
        {
          path: 'period-list',
          component: periodLists
        }
      ]
    },
    {path: '*', redirect: {name: 'login'}}
  ]
})
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.noAuth)) {
      next();
      return;
    }

    if (!auth.student.authenticated) {
      next({
       name: 'login'
      });
      return;
    }

    next();
  });
export default router;
