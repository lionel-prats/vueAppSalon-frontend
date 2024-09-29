import axios from "axios" 

const api = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
})

// en este interceptor de Axios centralizamos el envio del token de usuario autenticado en el header de la request para todas las request a endpoints protegidos del backend (v480)
api.interceptors.request.use( ( config ) => {

    // intentamos acceder al token de usuario autenticasdo almacenado en localStorage (puede no haber token)
    const token = localStorage.getItem("AUTH_TOKEN") 
    
    if(token) {
        // si hay token (porque puede no haberlo), incluimos ese Bearer token en los headers de nuestras request hacia endpoints protegidos del backend (v480)
        config.headers.Authorization = `Bearer ${token}`
    }

    return config 
})

export default api