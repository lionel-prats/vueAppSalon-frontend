<script setup>

    import { inject } from "vue" // importamos inject de Vue (nos sirve para acceeder a provides) (v453)
    
    import { reset } from "@formkit/vue" // importamos la funcion reset() de formkit que sirve para resetear formularios (v454)

    import AuthApi from "@/api/AuthAPI"

    const toast = inject("toast")

    const handleSubmit = async ({ password_confirm, ...formData }) => {
        try {
            const { data } = await AuthApi.register(formData)

            toast.open({ // notificacion de success Vue Toast Notification (v453)
                message: data.msg,
                type: "success",
            })

            // luego del INSERT en DB ejecutamos la funcion reset() de formkit para reiniciar el form de registro de usuario (v454)
            // como se ve, tenemos que pasarle el id que definimos en el form, para que reset() lo identifique y lo reinicie (v454)
            reset("registerForm")
            
        } catch (error) {
            toast.open({ // notificacion de error Vue Toast Notification (v455)
                message: error.response.data.msg,
                type: "error",
            })
        }
    }

</script>
<template>
    <div>
        
        <h1 class="text-6xl font-extrabold text-white text-center mt-10">Crea una cuenta</h1>
        <p class="text-2xl text-white text-center my-5">Crea una cuenta en AppSalón</p>

        <!-- formulario formkit de registro de usuario (v448) -->
        <!-- le agregamos el id="registerForm" para poder reiniciarlo con la funcion reset() de formkit luego del submit e INSERT en DB (v454)  -->
        <FormKit
            id="registerForm"
            type="form"
            :actions="false"
            incomplete-message="No se pudo enviar, revisa las notificaciones"
            @submit="handleSubmit"
        >
            <FormKit 
                type="text"
                label="Nombre"
                name="name"
                placeholder="Tu nombre"
                validation="required|length:3"
                :validation-messages="{ 
                    required: 'El nombre es obligatorio',
                    length: 'El nombre es muy corto',
                }" 
            />
            <FormKit 
                type="email"
                label="Email"
                name="email"
                placeholder="Email de registro"
                validation="required|email"
                :validation-messages="{ 
                    required: 'El email es obligatorio',
                    email: 'Email no válido',
                }" 
            />

            <!-- inputs password y password_confirm vvv -->
            <!-- 
                - para matchear ambos inputs y poder utilizar la regla de validacion de formkit confirm, el name del input de confirmacion tiene que ser dos substrings unidos por un "_"
                - la parte de la izquierda tiene que coincidir con el name del otro input con el que lo queremos matchear, y la parte de la derecha tiene que ser "confirm" (mismo nombre que la regla de validacion) 
                - por eso, los names de ambos inputs son "password" y "password_confirm" respectivamente (v450)
            -->
            <FormKit 
                type="password"
                label="Password"
                name="password"
                placeholder="Password de Usuario - Mín 8 caracteres"
                validation="required|length:8"
                :validation-messages="{ 
                    required: 'El password es obligatorio',
                    length: 'El password debe contener al menos 8 caracteres',
                }" 
            />
            <FormKit 
                type="password"
                label="Repetir Password"
                name="password_confirm"
                placeholder="Repite el password"
                validation="required|confirm"
                :validation-messages="{ 
                    required: 'El password es obligatorio',
                    confirm: 'Los passwords no coinciden',
                }" 
            />
              
            <FormKit type="submit">Crear Cuenta</FormKit>
        </FormKit>
    
    </div>

</template>