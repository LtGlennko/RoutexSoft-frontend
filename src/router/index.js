import Vue from 'vue'
import VueRouter from 'vue-router'

import Principal from '../views/Principal/Principal.vue'
import Search from '../views/Search.vue'

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
      },
      {
        path: '/CreateUser',
        name: 'CreateUser',
        component: () => import('../components/Administrator/CreateUser.vue')
      },
      {
        path: '/ModifyWarehouses',
        name: 'ModifyWarehouses',
        component: () => import('../components/Administrator/ModifyWarehouses.vue')
      },
      {
        path: '/CreateFlightPlan',
        name: 'CreateFlightPlan',
        component: () => import('../components/Administrator/CreateFlightPlan.vue')
      }
    ]
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../components/Login/Login.vue')
  },
  {
    path: '/Search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/Manager',
    name: 'Manager',
    component: Manager
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
