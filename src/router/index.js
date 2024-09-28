import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppoinmentsLayout from '@/views/appoinments/AppoinmentsLayout.vue'
import AuthAPI from "@/api/AuthAPI"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },

    // URLs privadas
    {
      path: "/reservaciones",
      name: "appoinments",
      component: AppoinmentsLayout, 
      meta: { requiresAuth: true }, // Route Meta Field (guard de navegación para restringir el acceso a esta url y a todas las url hijas) (v465)
      children: [ 
        {
          path: "", // http://localhost:5173/reservaciones (v464)
          name: "my-appoinments",
          component: () => import("@/views/appoinments/MyAppoinmentsView.vue"), 
        },
        {
          path: "nueva", // http://localhost:5173/reservaciones/nueva
          component: () => import("@/views/appoinments/NewAppoinmentLayout.vue"), 
          children: [
            {
              path: "",
              name: "new-appoinment",
              component: () => import("@/views/appoinments/ServicesView.vue"), 
            },
            {
              path: "detalles", // http://localhost:5173/reservaciones/nueva/detalles
              name: "appoinment-details",
              component: () => import("@/views/appoinments/AppoinmentView.vue"), 
            },
          ]
        },
      ]
    },

    // URLs publicas
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
          path: "login", // http://localhost:5173/auth/login
          name: "login",
          component: () => import("@/views/auth/LoginView.vue"),
        },
      ]
    },
  ]
})

// funcion para manejar el acceso a las diferentes rutas de la aplicacion (v465)
router.beforeEach( async(to, from, next) => {
  // to = pagina a donde vamos
  // from = de donde venimos
  // next = 

  // to.matched.some( (url) => url.meta.requiresAuth ) retornará true si la URL a la que se esta queriendo acceder desde el navegador tiene Route Meta Field requiresAuth definido, y en caso de estarlo, si es === true. Retornará false en caso contrario (v465)
  // para definir un Route Meta Field requiresAuth en una ruta, al objeto de la ruta le agregamos el key: value -> meta: { requiresAuth: true } (v465)
  const requiresAuth = to.matched.some( (url) => url.meta.requiresAuth )
  
  if(requiresAuth) { // si true, entonces la url a la que se esta queriendo acceder desde el navegador esta protegida, hacemos una request al backend
    
    // bloque para hacer la peticion GET a http://localhost:4000/api/auth/ incluyendo el token que tenemos almacenado en localStorage, para definir si permitimos o no el acceso a la ruta a la que se esta queriendo acceder desde el navegador (v470) 
    try {
      // si el backend nos retorno un status 200 con los datos del usuario, significa que todo esta bien, asi que permitimos el acceso a la ruta a la que se esta queriendo acceder desde el navegador (v470)
      await AuthAPI.auth()
      next()
    } catch {
      // si la ejecucion entra en el catch, significa que el backend nos retrorno un 403 (forbidden) entonces redirigimos al usuario al form de login
      next({ name: "login" })
    }
    // fin bloque

  } else { // si false, la url a la que se esta queriendo acceder desde el navegador no esta protegida, mostramos la vista
    next()
  }
})

export default router
