<script setup>
    import { inject } from "vue" // v508 
    import AuthApi from "@/api/AuthAPI" // v508
    const toast = inject("toast") // v508
    import { reset } from "@formkit/vue" // 509 

    const handleSubmit = async ({ email }) => {
        try {
            
            const { data } = await AuthApi.forgotPassword({email})

            toast.open({
                message: data.msg,
                type: "success",
            })

            // luego del la peticion reseteo el form, para evitar que un nuevo click en "btn.Enviar Instrucciones" involuntario realize una nueva peticion (v509) 
            reset("forgotPassword")
            
        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type: "error",
            })
        }
    }

</script>

<template>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">Olvidé mi password</h1>
    <p class="text-2xl text-white text-center my-5">Recupera el acceso a tu cuenta</p>

    <FormKit
        id="forgotPassword"
        type="form"
        :actions="false"
        incomplete-message="No se pudo enviar, revisa las notificaciones"
        @submit="handleSubmit"
    >
        <FormKit 
            type="email"
            label="Email"
            name="email"
            placeholder="Email de Usuario"
            validation="required|email"
            :validation-messages="{ 
                required: 'El email es obligatorio',
                email: 'Email no válido',
            }" 
        />
        <FormKit type="submit">Enviar Instrucciones</FormKit>
    </FormKit>
    
</template>