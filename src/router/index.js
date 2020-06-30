import Vue from 'vue'
import VueRouter from 'vue-router'

import Principal from '../views/Principal/Principal.vue'

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
      },
      {
        path: '/GestHistory',
        name: 'GestHistory',
        component: () => import('../components/Manager/GestHistory.vue')
      },
      {
        path: '/CreateClients',
        name: 'CreateClients',
        component: () => import('../components/Registrar/CreateClients.vue')
      },
      {
        path: '/CreateSending',
        name: 'CreateSending',
        component: () => import('../components/Registrar/CreateSending.vue')
      },
      {
        path: '/ManagePackages',
        name: 'ManagePackages',
        component: () => import('../components/Registrar/ManagePackages.vue')
      },
      {
        path: '/ManageClients',
        name: 'ManageClients',
        component: () => import('../components/Registrar/ManageClients.vue')
      },
      {
        path: '/SelectClient',
        name: 'SelectClient',
        component: () => import('../components/Registrar/SelectClient.vue')
      },
    ]
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../components/Login/Login.vue')
  },
  {
    path: '/ClientPrincipal',
    name: 'ClientPrincipal',
    component: () => import('../views/Principal/ClientPrincipal.vue')
  },
  {
    path: '/TrackPackage',
    name: 'TrackPackage',
    component: () => import('../views/Principal/SubViews/TrackPackage.vue')
  },
  {
    path: '/prueba',
    name: 'prueba',
    component: () => import('../views/Principal/SubViews/prueba.vue')
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
