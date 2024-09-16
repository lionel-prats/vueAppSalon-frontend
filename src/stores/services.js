import { ref, onMounted } from "vue"
import { defineStore } from "pinia"
import ServicesAPI from "@/api/ServicesAPI" 

export const useServicesStore = defineStore("services", () => {

    onMounted(async() => { // axios con async await
        try {
            const { data } = await ServicesAPI.all()
            console.log(data);
        } catch(error) {
            console.log(error);
        }
    })

    return {
        // vars/consts

        // states

        // getters

        // actions
    }
})