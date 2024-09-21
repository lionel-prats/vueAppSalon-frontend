import { ref, computed, onMounted } from "vue"
import { defineStore } from "pinia"

export const useAppoinmentsStore = defineStore("appoinments", () => {
    
    const services = ref([])
    const date = ref("")
    const hours = ref([])
    const time = ref("")

    onMounted(() => {
        const startHour = 10
        const endHour = 19
        for(let hour=startHour; hour <= endHour; hour++) {
            hours.value.push(hour + ":00")
        }
    })

    // ACTIONS vvv
    function onServiceSelected(service) {
        if(services.value.some(selectedService => selectedService._id === service._id)) {
            services.value = services.value.filter(selectedService => selectedService._id !== service._id)
        } else {
            if(services.value.length === 2) {
                alert("Máximo 2 servicios por cita")
                return
            } 
            services.value.push(service)
        }
    }
    function createAppoinment() {
        const appoinment = {
            services: services.value.map( service => service._id),
            date: date.value,
            time: time.value,
            totalAmount: totalAmount.value,
        }
        console.log(appoinment);
    }

    // GETERS vvv
    const isServiceSelected = computed( () => {
        return (id) => services.value.some(service => service._id === id)
    })
    const noServicesSelected = computed( () => {
        return services.value.length === 0
    })
    const totalAmount = computed( () => {
        return services.value.reduce( (total, service) => total + service.price, 0)
    })
    const isValidReservation = computed( () => {
        return services.value.length && date.value.length && time.value.length
    })
    
    return {
        // vars/consts

        // states
        services,
        date,
        hours,
        time,
        
        // getters
        isServiceSelected,
        totalAmount,
        noServicesSelected,
        isValidReservation,

        // actions
        onServiceSelected,
        createAppoinment,
    }
})