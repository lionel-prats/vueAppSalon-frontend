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
    {
      path: "/auth",
      name: "auth",
      component: () => import("@/views/auth/AuthLayout.vue"),
      children: [
        {
          path: "registro",
          name: "register",
          component: () => import("@/views/auth/RegisterView.vue"),
        },
        {
          path: "confirmar-cuenta/:token",
          name: "confirm-account",
          component: () => import("@/views/auth/ConfirmAccountView.vue"),
        },
        {
          path: "login",
          name: "login",
          component: () => import("@/views/auth/LoginView.vue"),
        },
      ]
    },
  ]
})

export default router
