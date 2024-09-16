import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppoinmentsLayout from '@/views/appoinments/AppoinmentsLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/reservaciones",
      name: "appoinments",
      component: AppoinmentsLayout, 
      children: [ 
        {
          path: "nueva",
          component: () => import("@/views/appoinments/NewAppoinmentLayout.vue"), 
          children: [
            {
              path: "",
              name: "new-appoinment",
              component: () => import("@/views/appoinments/ServicesView.vue"), 
            },
            {
              path: "detalles",
              name: "appoinment-details",
              component: () => import("@/views/appoinments/AppoinmentView.vue"), 
            },
          ]
        },
      ]
    },
  ]
})

export default router