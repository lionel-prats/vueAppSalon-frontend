// store para gestionar todo lo relacionado a la sesion de un usuario autenticado (store creado a partir del v471) (v471)

import { ref, onMounted, computed } from "vue"
import { defineStore } from "pinia"
import { useRouter } from "vue-router"
import AuthAPI from "@/api/AuthAPI"
import AppoinmentAPI from "@/api/AppoinmentAPI" // v486

export const useUserStore = defineStore("user", () => {
    
    const router = useRouter()

    // STATE vvv
    const user = ref({})
    const userAppoinments = ref([])
    const loading = ref(true) // v487
    

    onMounted( async() => {
        try {
            // obtenemos los datos del usuario auntenticado cada vez que se ejecuta este store (v471)
            const { data } = await AuthAPI.auth()
            
            // guardamos la data del usuario autenticado en el state
            user.value = data

            // llamado a la API para obtener las citas del usuario autenticado cada vez que se ejecuta este store (v486)
            await getUserAppoinments()

        } catch (error) {
            console.log(error);
        } finally {
            // tecnica para mejorar la experiencia de usuario en el componente \src\views\appoinments\MyAppoinmentsView.vue mostrando un mensaje "Cargando..." mientras llegan las respuestas de la API en las peticiones del try (v487)
            loading.value = false
        }
    })

    // GET a http://localhost:4000/api/users/:id_user/appoinments para obtener las citas de un usuario, con token de autenticacion en el header y acceso permitido desde el back solo si el usuario autenticado es el propietario de las citas, y guardarlas en el state (v486)
    async function getUserAppoinments(){
        const { data } = await AppoinmentAPI.getUserAppoinments(user.value._id)
        userAppoinments.value = data
    }


    // funcion para "cerrar la sesion" de un usuario autenticado
    function logout() {
        localStorage.removeItem("AUTH_TOKEN")
        user.value = {}
        router.push({ name: "login" })
    }

    // GETTERS vvv
    const getUserName = computed( () => user.value?.name ? user.value.name : "")

    // getter para saber si un usuario autenticado tiene citas reservadas hacia adelante (v486)
    const noAppoinments = computed( () => userAppoinments.value.length === 0) 

    return {
        // vars/consts

        // states
        user,
        userAppoinments,
        loading,
        
        // getters
        getUserName,
        noAppoinments,

        // actions
        logout,
        getUserAppoinments,
    }
})