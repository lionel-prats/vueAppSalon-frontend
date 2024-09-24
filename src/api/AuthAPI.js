import api from "@/lib/axios"

export default {
    // POST a http://localhost:4000/api/auth/register (crear cuenta)
    register(data) { 
        return api.post("/auth/register", data)
    },
    
    // GET a http://localhost:4000/api/auth/verify/:token (verificar cuenta de usuario)
    verifyAccount(token) { 
        return api.get(`/auth/verify/${token}`)
    },
    
    // POST a http://localhost:4000/api/auth/login (iniciar sesion) (v460)
    login(data) { 
        return api.post("/auth/login", data)
    },
}