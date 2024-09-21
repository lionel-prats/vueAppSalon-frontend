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

    // funcion para controlar fechas habilitadas/deshabilitadas en el form de DatePicker (v430)
    // el parametro recibido es cada una de las fechas renderizadas en el calendario, y se trata de un objeto date Date() de JS 
    // objeto Date JS = Sat Sep 21 2024 19:37:35 GMT-0300 (hora estándar de Argentina)
    const disabledDate = (date) => {
        const today = new Date() // obtengo el onjeto Date JS de la fecha actual, que me servirá para las siguientes validaciones

        // validaciones vvv 
        // 1. valido si la fecha renderizada en el calendario es anterior a la fecha actual
        // 2. valido si el mes de la fecha renderizada en el calendario es dos meses o mas, mayor respecto al mes de la fecha actual
        // 3. valido si la fecha renderizada en el calendario es sabado o domingo 
        // cualquier TRUE en alguna de las 3 validaciones, hara que la funcion retorne TRUE, y en esos casos, la fecha renderizada en el calendario estara deshabilitada
        return date < today || date.getMonth() > today.getMonth() + 1 || [0,6].includes(date.getDay())
    }

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
                        :disable-date="disabledDate"
                        i18n="es"
                        as-single
                        no-input
                        :formatter="formatter"
                        v-model="appoinments.date" 
                    />
                    <!-- prop :disable-date="false" -> la fecha estara habilitada (v430) -->
                    <!-- prop :disable-date="true" -> la fecha estara deshabilitada (v430) -->
                </div>
                <!-- fon calendario datePicker (v425) -->

                <div class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5 lg:mt-0">
                    <button
                        class="block rounded-lg text-xl font-black p-3"
                        v-for="hour in appoinments.hours"
                        @click="appoinments.time = hour"  
                        :class="appoinments.time === hour ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'" 
                    >{{ hour }}</button>
                </div>
            </div>
            <div 
                class="flex justify-end"
                v-if="appoinments.isValidReservation"    
            >
                <button 
                    type="button"
                    class="w-full lg:w-auto bg-blue-500 p-3 rounded-lg font-black text-white"    
                    @click="appoinments.createAppoinment"
                >Confirmar Reservación</button>
            </div>
        </div>

    <!-- </div> -->
</template>