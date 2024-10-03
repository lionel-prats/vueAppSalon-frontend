import api from "@/lib/axios"

export default {
    // POST a http://localhost:4000/api/auth/register (crear cuenta)
    register(data) { 
        return api.post("/auth/register", data)
    },
    
    // GET a http://localhost:4000/api/auth/verify/:token (endpoint para confirmar una nueva cuenta de usuario)
    verifyAccount(token) { 
        return api.get(`/auth/verify/${token}`)
    },
    
    // POST a http://localhost:4000/api/auth/login (iniciar sesion) (v460)
    login(data) { 
        return api.post("/auth/login", data)
    },

    // GET a http://localhost:4000/api/auth/user con token de autenticacion en el header (v470)
    // en la request a este endpoint pasamos en el header el token que nos retorna el endpoint POST .../auth/login cuando iniciamos sesion desde el form de login y que tenemos almacenado en localStorage (v470)
    // esta request la ejecutaremos desde \src\router\index.js cada vez que querramos acceder a una ruta para usuarios autenticados de nuestra app vue (v470)
    // tambien lo ejecutamos desde el store user (v471)
    auth() { 
        return api.get("/auth/user")

        /*
        // hasta el v479 esta era la peticion. En el v480 aparece el tema de los interceptors de Axios y pasamos a centralizar el envio del token en el header de la request, en la instancia de Axios (en el archivo \src\lib\axios.js), para reutilizar ese codigo en las distintas peticiones y simplificar las funciones que hacen peticiones a rutas protegidas del backend (hay notas en v480, en el que Valdez explica el tema)
        
        const token = localStorage.getItem("AUTH_TOKEN") // intentamos acceder al token almacenado en localStorage
        return api.get(
            "/auth/user", 
            // en peticiones GET en Axios, como segundo parametro de la funcion, podemos pasar un objeto de configuracion para la request, donde podemos configurar el header de peticion (v470) vvv
            // en peticiones POST, este objeto de configuracion es el tercer parametro, ya que el segundo parametro es el body de la request (v470)
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        */
    },

    // POST a http://localhost:4000/api/auth/forgot-password (recuperar password) (v508)
    forgotPassword(data) { 
        return api.post("/auth/forgot-password", data)
    },
    
    // GET a http://localhost:4000/api/auth/forgot-password/:token (v511)
    verifyPasswordResetToken(token) { 
        return api.get(`/auth/forgot-password/${token}`)
    },
    
    // POST a http://localhost:4000/api/auth/forgot-password/:token (v513)
    updatePassword(token, data) { 
        return api.post(`/auth/forgot-password/${token}`, data)
    },

}