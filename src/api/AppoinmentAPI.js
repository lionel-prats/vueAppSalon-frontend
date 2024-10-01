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
    },
    
    // GET a http://localhost:4000/api/users/:id_user/appoinments para obtener las citas de un usuario, con token de autenticacion en el header y acceso permitido desde el back solo si el usuario autenticado es el propietario de las citas (v486)
    getUserAppoinments(userId) { 
        return api.get(`/users/${userId}/appoinments`)
    },
    
    // GET al endpoint protegido http://localhost:4000/api/appoinments/:id_cita para obtener una cita por id de cita, con token de usuario autenticado en el header (v493)
    getById(id) { 
        return api.get(`/appoinments/${id}`)
    },
    
    // PUT al endpoint protegido http://localhost:4000/api/appoinments/:id_cita para UDATEAR una cita existente, con token de usuario autenticado en el header (v498)
    update(id, data) { 
        return api.put(`/appoinments/${id}`, data)
    },
    
    // DELETE al endpoint protegido http://localhost:4000/api/appoinments/:id_cita para eliminar una cita de la DB, con token de usuario autenticado en el header (v501)
    delete(id) { 
        return api.delete(`/appoinments/${id}`)
    },
}