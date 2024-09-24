<script setup>
    import { onMounted, inject } from "vue"
    import { useRoute, useRouter } from "vue-router"
    import AuthApi from "@/api/AuthAPI"

    const toast = inject("toast")
    const route = useRoute()
    const router = useRouter()
    const { token } = route.params
    
    onMounted(async() => { // axios con async await (v457)
        try {
            const { data } = await AuthApi.verifyAccount(token)
            toast.open({ // notificacion de success Vue Toast Notification (v458)
                message: data.msg,
                type: "success",
            })
            setTimeout(() => {
                router.push({name: "login"});
            }, 5000);
        } catch(error) {
            toast.open({ // notificacion de error Vue Toast Notification (v458)
                message: error.response.data.msg,
                type: "error",
            })
        }
    })

</script>
<template>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">Verificar Cuenta</h1>
</template>