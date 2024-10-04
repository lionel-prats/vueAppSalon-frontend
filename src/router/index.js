import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppoinmentsLayout from '@/views/appoinments/AppoinmentsLayout.vue'
import AuthAPI from "@/api/AuthAPI"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    // para que necesito este path?
    {
      path: "/", // http://localhost:5173/ (habria que ver la forma de que el acceso a esta ruta desde el navegador haga una redireccion porque aca no se renderiza nada util)
      name: "home",
      component: HomeView
    },
    // FIN para que necesito este path?

    // URLs privadas vvv

    // exclusivas administradores (v516)
    {
      path: "/admin",
      name: "admin",
      component: () => import("@/views/admin/AdminLayout.vue"),
      meta: { soloAdministradores: true }, // guard de navegacion para restrinjir el acceso a este grupo de rutas solo a usuarios autenticados y administradores (v517)
      children: [
        {
          path: "", // http://localhost:5173/admin (ponel de administracion) (v518)
          name: "admin-appoinments",
          component: () => import("@/views/admin/AppoinmentsView.vue"),
        }
      ],
    },

    // usuarios autenticados en general
    {
      path: "/reservaciones",
      name: "appoinments",
      component: AppoinmentsLayout, 
      meta: { requiresAuth: true }, // Route Meta Field (guard de navegación para restringir el acceso a esta grupo de rutas solo a usuarios autenticados - administradores y no administradores -) (v465)
      children: [ 
        
        {
          path: "", // http://localhost:5173/reservaciones (listado de citas de un usuario autenticado) (v464)
          name: "my-appoinments",
          component: () => import("@/views/appoinments/MyAppoinmentsView.vue"), 
        },
        
        // bloque de rutas para reservar una nueva cita
        {
          path: "nueva",
          component: () => import("@/views/appoinments/NewAppoinmentLayout.vue"), 
          children: [
            {
              path: "", // http://localhost:5173/reservaciones/nueva (servicios seleccionables en la seccion para crear una nueva cita)
              name: "new-appoinment",
              component: () => import("@/views/appoinments/ServicesView.vue"), 
            },
            {
              path: "detalles", // http://localhost:5173/reservaciones/nueva/detalles (seleccionar fecha y hora en la seccion para crear una nueva cita)
              name: "appoinment-details",
              component: () => import("@/views/appoinments/AppoinmentView.vue"), 
            },
          ]
        },
        // FIN bloque de rutas para reservar una nueva cita

        // bloque de rutas para editar una cita ya existente (v490)
        {
          path: ":id/editar",
          component: () => import("@/views/appoinments/EditAppoinmentLayout.vue"), 
          children: [
            {
              path: "", // http://localhost:5173/reservaciones/:id_cita/editar (modificar servicios en la seccion para editar una cita existente)
              name: "edit-appoinment",
              component: () => import("@/views/appoinments/ServicesView.vue"), 
            },
            {
              path: "detalles", // http://localhost:5173/reservaciones/:id_cita/detalles (modificar fecha y hora en la seccion para editar una cita existente)
              name: "edit-appoinment-details",
              component: () => import("@/views/appoinments/AppoinmentView.vue"), 
            },
          ]
        },
        // FIN bloque de rutas para editar una cita ya existente (v490)

      ]
    },
    // FIN URLs privadas

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
        {
          path: "olvide-password", // http://localhost:5173/auth/olvide-password (form para recuperar password al que se accede desde la app vue y en el que el usuario submitea su email para que le llegue el enlace de recuperacion de password) (v506)
          name: "forgot-password",
          component: () => import("@/views/auth/ForgotPasswordView.vue"),
        },
        {
          path: "olvide-password/:token", // http://localhost:5173/auth/olvide-password/:token (form para crear un nuevo password al que el usuario accede desde el mail que le llegó, y en el que podrá submitear el nuevo password) (v506)
          name: "new-password",
          component: () => import("@/views/auth/NewPasswordView.vue"),
        },
      ]
    },
    // FIN URLs publicas

  ]
})

// guard de navegacion para restrinjir el acceso a rutas protegidas de mi app solo a usuarios autenticados (administradores y no administradores) (v465)
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
      const { data } = await AuthAPI.auth()

      // bloque que valida si el usuario auteticado es admin o no (v515)
      if(data.admin) {
        
        // si el usuario que se acaba de autenticar (submit del form de login en \src\views\auth\LoginView.vue) es admin, me interpongo en el flujo del componente para redirijir al administrador al panel de administracion (http://localhost:5173/admin) (v515) 
        next({ name: "admin" })
        
      } else {
        
        // si el usuario que se acaba de autenticar (submit del form de login en \src\views\auth\LoginView.vue) NO es admin, no intervengo en el flujo del componente (v515) 
        next()

      }


    } catch {
      // si la ejecucion entra en el catch, significa que el backend nos retrorno un 403 (forbidden) entonces redirigimos al usuario al form de login
      next({ name: "login" })
    }
    // fin bloque

  } else { // si false, la url a la que se esta queriendo acceder desde el navegador no esta protegida, mostramos la vista
    next()
  }
})

// guard de navegacion para restrinjir el acceso a rutas de administrador solo a usuarios autenticados y administradores (v517)
router.beforeEach( async(to, from, next) => {
  
  const soloAdministradores = to.matched.some( (url) => url.meta.soloAdministradores )
  
  if(soloAdministradores) { 
    try {
      await AuthAPI.admin()
      next()
    } catch (error) {
      next({ name: "login" })
    }
  } else {
    next()
  }

})

export default router
