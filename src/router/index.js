import Vue from 'vue'
import VueRouter from 'vue-router'

import Principal from '../views/Principal.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/Principal',
    name: 'Principal',
    component: Principal,
    children:[
      {
        path: '/ManageUsers',
        name: 'ManageUsers',
        component: () => import('../components/Administrator/ManageUsers.vue')
      },
      {
        path: '/ManageWarehouses',
        name: 'ManageWarehouses',
        component: () => import('../components/Administrator/ManageWarehouses.vue')
      },
      {
        path: '/ManageFlightPlans',
        name: 'ManageFlightPlans',
        component: () => import('../components/Administrator/ManageFlightPlans.vue')
      },
      {
        path: '/ConfigureParameters',
        name: 'ConfigureParameters',
        component: () => import('../components/Administrator/ConfigureParameters.vue')
      },
      {
        path: '/SelectClients',
        name: 'SelectClients',
        component: () => import('../components/Registrar/SelectClients.vue')
      }
    ]
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../components/Login/Login.vue')
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
