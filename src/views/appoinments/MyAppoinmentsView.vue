<script setup>
    import { useUserStore } from "@/stores/user"
    import Appoinment from "@/components/Appoinment.vue"

    const user = useUserStore()

</script>

<template>
    <h2 class="text-4xl font-extrabold text-white mt-10">Mis citas</h2>
    <p class="text-white text-lg mt-5">A continuación podrás administrar tus próximas citas</p>
    <p 
        v-if="user.loading"
        class="text-white text-2xl text-center mt-5"
    >Cargando...</p>
    <div v-else>
        <p 
            v-if="user.noAppoinments"
            class="text-white text-2xl text-center mt-5"
        >No tienes próximas citas</p>
        <p 
            v-else
            class="grid grid-cols-1 gap-5 mt-10"    
        >
            <Appoinment 
                v-for="appoinment in user.userAppoinments"
                :key="appoinment._id"
                :appoinment="appoinment"
            />
        </p>
    </div>

</template>