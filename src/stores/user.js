// store para gestionar todo lo relacionado a la sesion de un usuario autenticado (store creado a partir del v471) (v471)

import { ref, onMounted, computed } from "vue"
import { defineStore } from "pinia"
import { useRouter } from "vue-router"
import AuthAPI from "@/api/AuthAPI"

export const useUserStore = defineStore("user", () => {
    
    const router = useRouter()

    const user = ref({})
    
    // obtenemos los datos del usuario auntenticado cada vez que se ejecuta este store (v471)
    onMounted( async() => {
        try {
            const { data } = await AuthAPI.auth()
            user.value = data
        } catch (error) {
            console.log(error);
        }
    })

    // funcion para "cerrar la sesion" de un usuario autenticado
    function logout() {
        localStorage.removeItem("AUTH_TOKEN")
        user.value = {}
        router.push({ name: "login" })
    }

    const getUserName = computed( () => user.value?.name ? user.value.name : "")

    return {
        // vars/consts

        // states
        user,
        
        // getters
        getUserName,

        // actions
        logout,
    }
})