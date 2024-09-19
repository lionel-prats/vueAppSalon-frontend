<script setup>
    import { ref } from "vue"
    import VueTailwindDatePicker from "vue-tailwind-datepicker" // libreria datePicker (v425)
    import SelectedService from '@/components/SelectedService.vue';
    import { useAppoinmentsStore } from "@/stores/appoinments"
    import { formatCurrency } from "@/helpers"
    
    const appoinments = useAppoinmentsStore()

    const formatter = ref({ // configuracion datePicker (v426)
        date: "DD/MM/YYYY",
        month: "MMM",
    })
</script>

<template>
    <!-- <div> -->
        <h2 class="text-4xl font-extrabold text-white">Detalles Cita y Resumen</h2>
        <p class="text-white text-lg">Verifica la información y confirma tu cita</p>
        <h3 class="text-3xl font-extrabold text-white">Servicios</h3>
        <p 
            class="text-white text-2xl text-center"
            v-if="appoinments.noServicesSelected"
        >No hay servicios seleccionados</p>
        <div 
            class="grid gap-5" 
            v-else
        >
            <SelectedService 
                v-for="service in appoinments.services"
                :key="service._id"
                :service="service"
            />
            <p class="text-right text-white text-2xl">
                Total a pagar: 
                <span class="font-black">
                    {{ formatCurrency(appoinments.totalAmount) }}
                </span>
            </p>
        </div>

        <div class="space-y-8" v-if="!appoinments.noServicesSelected">
            <h3 class="text-3xl font-extrabold text-white">Fecha y Hora</h3>
            <div class="lg:flex gap-5 items-start">
                <!-- calendario datePicker (v425) -->
                <div class="w-full lg:w-96 bg-white flex justify-center rounded-lg">
                    <VueTailwindDatePicker 
                        i18n="es"
                        as-single
                        no-input
                        :formatter="formatter"
                        v-model="appoinments.date" 
                    />
                    <!-- 
                    -->
                </div>
                <!-- fon calendario datePicker (v425) -->

                <div class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5 lg:mt-0">
                    <button
                        class="block text-blue-500 rounded-lg text-xl font-black p-3 bg-white"
                        v-for="hour in appoinments.hours"
                    >
                        {{ hour }}
                    </button>
                </div>
            </div>
        </div>

    <!-- </div> -->
</template>