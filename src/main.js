import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { plugin, defaultConfig } from "@formkit/vue" // v448
import config from '../formkit.config' // objeto de configuracion de formkit, definido en formkit.config.js (v448)

import { useToast } from 'vue-toast-notification'; // importamos la libreria Vue Toast Notification, de notificaciones toast para vue (v452)

import App from './App.vue'
import router from './router'

import 'vue-toast-notification/dist/theme-sugar.css'; // importamos uno de los temas Vue Toast Notification, que determinará el estilo de las notificaciones (hay otros temas, ver notas del v452) (v452)

// instancia global con su configuracion para todas las notificaciones Vue Toast Notification (v452)
const $toast = useToast({
    duration: 5000,
    position: 'top-right',
});

const app = createApp(App)

app.provide("toast", $toast) // guardamos en un provide la instancia de Vue Toast Notification  con su configuracion para que pueda ser accedida desde cualquier componente de la aplicacion con inject (v453)

app.use(createPinia())

app.use(plugin, defaultConfig(config)) // instalamos formkit (v448)

app.use(router)

app.mount('#app')
