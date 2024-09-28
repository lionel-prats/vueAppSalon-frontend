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

    // GET a http://localhost:4000/api/auth/user (v470)
    // en la request a este endpoint pasamos en el header el token que nos retorna el endpoint POST .../auth/login cuando iniciamos sesion desde el form de login y que tenemos almacenado en localStorage (v470)
    // esta request la ejecutaremos desde \src\router\index.js cada vez que querramos acceder a una ruta para usuarios autenticados de nuestra app vue (v470)
    // tambien lo ejecutamos desde el store user (v471)
    auth() { 
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
    },
}