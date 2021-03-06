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
        path: '/GestPackages',
        name: 'GestPackages',
        component: () => import('../components/Manager/GestPackages.vue')
      },
      {
        path: '/GestRutes',
        name: 'GestRutes',
        component: () => import('../components/Manager/GestRutes.vue')
      },
      {
        path: '/GestSimulation',
        name: 'GestSimulation',
        component: () => import('../components/Manager/GestSimulation.vue')
      },
      {
        path: '/Simulation',
        name: 'Simulation',
        component: () => import('../components/Manager/Simulation.vue')
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
      }
      ,
      {
        path: '/RouteDetail',
        name: 'RouteDetail',
        component: () => import('../components/Registrar/RouteDetail.vue')
      },
      {
        path: '/CollapseCapacityReport',
        name: 'CollapseCapacityReport',
        component: () => import('../components/Manager/CollapseCapacityReport.vue')
      },
      {
        path: '/ManageComplains',
        name: 'ManageComplains',
        component: () => import('../components/Registrar/ManageComplains.vue')
      },
      {
        path: '/ViewComplain',
        name: 'ViewComplain',
        component: () => import('../components/Registrar/ViewComplain.vue')
      }
      
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
    path: '/RegisterComplain',
    name: 'RegisterComplain',
    component: () => import('../views/Principal/SubViews/RegisterComplain.vue')
  },
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
