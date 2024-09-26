<script setup>
    import { inject } from "vue"
    import { useRouter } from "vue-router"
    import AuthApi from "@/api/AuthAPI"

    const toast = inject("toast")
    const router = useRouter()

    const handleSubmit = async (formData) => {
        try {
            const { data: { token } } = await AuthApi.login(formData) // "doble destructuring" como forma de acceder al token en una sola linea (v463)
            localStorage.setItem("AUTH_TOKEN", token);
            router.push({ name: "my-appoinments" })
        } catch (error) {
            toast.open({ // notificacion de error Vue Toast Notification (v460)
                message: error.response.data.msg,
                type: "error",
            })
        }
    }
</script>
<template>
    <div>
        
        <h1 class="text-6xl font-extrabold text-white text-center mt-10">Iniciar Sesión</h1>
        <p class="text-2xl text-white text-center my-5">Si tienes una cuenta, inicia sesión</p>

        <!-- formulario formkit de inicio de sesion (v459) -->
        <FormKit
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
            <FormKit 
                type="password"
                label="Password"
                name="password"
                placeholder="Password de Usuario"
                validation="required"
                :validation-messages="{ 
                    required: 'El password es obligatorio',
                    length: 'El password debe contener al menos 8 caracteres',
                }" 
            />
            <FormKit type="submit">Iniciar Sesión</FormKit>
        </FormKit>
    
    </div>

</template>