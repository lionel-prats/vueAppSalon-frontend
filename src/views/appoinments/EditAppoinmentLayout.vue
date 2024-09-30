<script setup>
    import { onMounted } from "vue"
    import { useRoute, useRouter } from "vue-router"
    import AppoinmentAPI from "@/api/AppoinmentAPI"
    
    const route = useRoute()
    const router = useRouter()

    const { id } = route.params // extraigo de la URL el id de la cita a editar (v491)   

    // apenas se cargue este componente obtengo la data de la cita que se esta queriendo editar (v491)
    onMounted( async () => {
        try {
            const { data } = await AppoinmentAPI.getById(id)
            console.log(data);
        } catch (error) {
            router.push({ name: "my-appoinments"})
        }
    })


</script>
<template>
    <div>
        <nav class="my-5 flex gap-3">

            <RouterLink
                :to="{name:'edit-appoinment'}"
                class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
                :class="[route.name === 'edit-appoinment' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500']"
            >Servicios <span class="text-black block normal-case">(desde EditAppoinmentLayout.vue)</span></RouterLink>
            
            <RouterLink
                :to="{name:'edit-appoinment-details'}"
                class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
                :class="[route.name === 'edit-appoinment-details' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500']"
            >Cita y Resumen <span class="text-black block normal-case">(desde EditAppoinmentLayout.vue)</span></RouterLink>
        
        </nav>
        <div class="space-y-5">
            <RouterView />
        </div>
    </div>
</template>