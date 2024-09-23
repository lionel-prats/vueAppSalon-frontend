import api from "@/lib/axios"

export default {
    register(data) { // POST a http://localhost:4000/api/auth/register
        return api.post("/auth/register", data)
    },
}