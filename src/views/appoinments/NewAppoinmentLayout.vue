<script setup>
    import { onMounted } from "vue" // v500
    import { useRoute } from "vue-router"
    import { useAppoinmentsStore } from "@/stores/appoinments" // v500
    
    const appoinments = useAppoinmentsStore() // v500

    // cada vez que el usuario navega a "Nueva Cita" (http://localhost:5173/reservaciones/nueva) y se carga este componente reiniciamos el state del store appoinments para evitar fallas en la experiencia de usuario (reveer video si no se entiende) (v500) 
    onMounted( () => {
        appoinments.clearAppoinmentData() 
    })

    const route = useRoute()
    
</script>
<template>
    <div>
        <nav class="my-5 flex gap-3">

            <RouterLink
                :to="{name:'new-appoinment'}"
                class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
                :class="[route.name === 'new-appoinment' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500']"
            >Servicios <span class="text-black block normal-case">(desde NewAppoinmentLayout.vue)</span></RouterLink>
            
            <RouterLink
                :to="{name:'appoinment-details'}"
                class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
                :class="[route.name === 'appoinment-details' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500']"
            >Cita y Resumen <span class="text-black block normal-case">(desde NewAppoinmentLayout.vue)</span></RouterLink>
        
        </nav>
        <div class="space-y-5">
            <RouterView />
        </div>
    </div>
</template>