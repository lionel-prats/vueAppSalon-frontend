<script setup>
    import { displayDate } from "@/helpers/date" // v488
    import { formatCurrency } from "@/helpers" // v489

    defineProps({
        appoinment: {
            type: Object
        }
    })
</script>

<template>
    <div class="bg-white p-5 space-y-3 rounded-lg"> 
        <p class="text-gray font-black">
            Fecha: <span class="font-light">{{ displayDate(appoinment.date) }}</span>
            Hora: <span class="font-light">{{ appoinment.time }} horas.</span>
        </p>
        <p class="text-lg font-black">Servicios Solicitados en las citas</p>
        <div v-for="service in appoinment.services">
            <p>{{ service.name }}</p>
            <p class="text-2xl font-black text-blue-500">{{ formatCurrency(service.price) }}</p>
        </div>
        <p class="text-2xl font-black text-right">
            Total a pagar: <span class="text-blue-600">{{ formatCurrency(appoinment.totalAmount) }}</span>
        </p>
        <div class="flex gap-2 items-center">

            <RouterLink
                class="bg-slate-600 rounded-lg p-3 text-white text-sm uppercase font-black flex-1 md:flex-none"
                :to="{ name: 'edit-appoinment', params: { id: appoinment._id } }"
            >Editar Cita</RouterLink>
           
            <button
                class="bg-red-600 rounded-lg p-3 text-white text-sm uppercase font-black flex-1 md:flex-none"
            >Cancelar Cita</button>
        </div>

    </div>
</template>