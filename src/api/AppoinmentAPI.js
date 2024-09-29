// servicio para centralizar las peticiones relacionadas a citas de usuario, creado en el v475

import api from "@/lib/axios"

export default {
    
    // POST a http://localhost:4000/api/appoinments con token de autenticacion en el header (v475)
    create(data) { 
        return api.post("/appoinments", data)
        /* 
        // hasta el v479 esta era la peticion. En el v480 aparece el tema de los interceptors de Axios y pasamos a centralizar el envio del token en el header de la request, en la instancia de Axios (en el archivo \src\lib\axios.js), para reutilizar ese codigo en las distintas peticiones y simplificar las funciones que hacen peticiones a rutas protegidas del backend (hay notas en v480, en el que Valdez explica el tema)

        const token = localStorage.getItem("AUTH_TOKEN")
        return api.post(
            "/appoinments", 
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ) 
        */
    },

    // GET a http://localhost:4000/api/appoinments?date=dd/mm/yyyy con token de autenticacion en el header (v480)
    getByDate(date) { 
        return api.get(`/appoinments?date=${date}`)
    }
}