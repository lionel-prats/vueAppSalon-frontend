<script setup>
    import { formatCurrency } from "@/helpers"
    import { useAppoinmentsStore } from "@/stores/appoinments"
    
    const appoinments = useAppoinmentsStore()

    defineProps({
        service: {
            type: Object,
        }
    })

</script>

<template>
    <div 
        class="p-5 space-y-5 rounded-lg cursor-pointer"
        :class="appoinments.isServiceSelected(service._id) ? 'bg-blue-500 text-white' : 'bg-white'"
        @click="appoinments.onServiceSelected(service)"    
        >
        <p class="text-2xl font-light">{{ service.name }}</p>
        <p 
            class="text-4xl font-black"
            :class="appoinments.isServiceSelected(service._id) ? 'text-white' : 'text-blue-600'"
        >{{ formatCurrency(service.price) }}</p>
    </div>
</template>