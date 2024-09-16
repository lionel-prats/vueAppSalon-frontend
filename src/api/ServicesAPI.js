import api from "@/lib/axios"

export default {
    all() { // GET a http://localhost:8000/api/services
        return api.get("/services")
    },
}