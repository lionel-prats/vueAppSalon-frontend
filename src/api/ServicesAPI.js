import api from "@/lib/axios"

export default {
    all() { // GET a http://localhost:4000/api/services
        return api.get("/services")
    },
}