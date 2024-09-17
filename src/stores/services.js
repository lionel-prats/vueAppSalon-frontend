import { ref, onMounted } from "vue"
import { defineStore } from "pinia"
import ServicesAPI from "@/api/ServicesAPI"

export const useServicesStore = defineStore("services", () => {

    const services = ref([])

    onMounted(async() => { // axios con async await (v417)
        try {
            const { data } = await ServicesAPI.all()
            services.value = data
        } catch(error) {
            console.log(error);
        }
    })

    return {
        // vars/consts

        // states
        services,
        
        // getters

        // actions
    }
})