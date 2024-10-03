<script setup>

    import { onMounted, inject, ref } from "vue" // v511
    import { useRoute, useRouter } from "vue-router" // v511|v513
    import AuthApi from "@/api/AuthAPI" // v511

    const route = useRoute()
    const router = useRouter()

    const toast = inject("toast")

    const { token } = route.params
    
    // state para determinar si habilito o no el form para crear un nuevo password (v511)
    const validToken = ref(false)

    // v511
    onMounted( async() => { 
        try {
            
            // request #1 al back para verificar si el token de la URL es valido y en ese caso permitirle al usuario crear un nuevo password (v511)
            const { data } = await AuthApi.verifyPasswordResetToken(token)
            
            // el token es valido, pongo el state en true para habilitar el form y que el usuario pueda crear un nuevo password (v511) 
            validToken.value = true

        } catch (error) {
            toast.open({ 
                message: error.response.data.msg,
                type: "error",
            })
        }
    })

    const handleSubmit = async ({ password }) => {
        try {
            
            // request #2 al back para que el usuario cree un nuevo password (UPDATE en users.password) (v512)
            const { data } = await AuthApi.updatePassword(token, { password })
            toast.open({ 
                message: data.msg,
                type: "success",
            })

            router.push({ name: "login" })

        } catch (error) {
            toast.open({ 
                message: error.response.data.msg,
                type: "error",
            })
        }
    }

</script>

<template>
    <div v-if="validToken">
        <h1 class="text-6xl font-extrabold text-white text-center mt-10">Nuevo password</h1>
        <p class="text-2xl text-white text-center my-5">Coloca tu nuevo password</p>

        <FormKit
            id="newPasswordForm"
            type="form"
            :actions="false"
            incomplete-message="No se pudo enviar, revisa las notificaciones"
            @submit="handleSubmit"
        >
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

            <FormKit type="submit">Guardar Password</FormKit>
        </FormKit>
    </div>
    <p v-else class="text-center text-2xl font-black text-white">Token no válido</p>
    
</template>