import { ref, computed, onMounted, inject, watch } from "vue"
import { defineStore } from "pinia"
import { useRouter } from "vue-router"
import AppoinmentAPI from "@/api/AppoinmentAPI" // v475
import { convertToISO, convertToDDMMYYYY } from "@/helpers/date" // v476|v496
import { useUserStore } from "@/stores/user" // v499

export const useAppoinmentsStore = defineStore("appoinments", () => {
    
    const router = useRouter()
    const toast = inject("toast")
    const user = useUserStore() // v499

    // STATE vvv
    const appoinmentId = ref("") // state para identificar si estamos intentando editar una cita existente o crear una cita nueva (este state almacenará el id de una cita que se esta queriendo editar, por lo tanto que esté o no vacío nos servirá para detectar eso) (v497)
    const services = ref([]) // state para almacenar los servicios que seleccionó el usuario para una nueva cita
    const date = ref("") // state para almacenar la fecha seleccionada por el usuario en el calendario (originalmente se almacena en formato string "dd/mm/yyyy")
    const hours = ref([]) // state para almacenar los horarios de reservacion de citas definidos por el admin y renderizarlos en pantalla
    const time = ref("") // state para almacenar el horario seleccionado por el usuario
    const appoinmentsByDate = ref([]) // state para almacenar los horarios ya ocupados para una fecha determinada (request a la API) (v482)

    onMounted(() => {
        const startHour = 10
        const endHour = 19
        for(let hour=startHour; hour <= endHour; hour++) {
            hours.value.push(hour + ":00")
        }
    })

    // watch para observar por cambios en el sate date (es decir, se ejecutará cada vez que el usuario seleccione una nueva fecha en el calendario para reservar una nueva cita), para en en cada nueva seleccion hacer un GET a http://localhost:4000/api/appoinments?date=dd/mm/yyyy (con token de autenticacion en el header) para obtener los horarios ya ocupados para esa fecha y a partir de esta info poder ofrecerle solo los horarios disponibles (v481)
    watch(date, async () => { 
        
        time.value = ""

        // cuando se graba una nueva cita reinicio el state date, entonces con esta validacion evito el llamado inncecesario a la API luego del INSERT en appoinments (v482)
        if(date.value === "") return
        
        const { data } = await AppoinmentAPI.getByDate(date.value)
        
        if(appoinmentId.value) { 
            // estamos intentando editar una cita ya existente, entonces inhabilito todos los horarios ya ocupados para la fecha que eligió el usuario, MENOS la fecha que ya etaba seleccionada para esta cita, la cual mantento habilitada para que la pueda volver a elegir (v497)
            appoinmentsByDate.value = data.filter( appoinment => appoinment._id !== appoinmentId.value)

            // como estamos intentando editar una cita que ya tiene un horario preseleccionado, almacenamos ese hortario en el state para que sea el horario seleccionado por default en la fecha default de la cita (v497)
            time.value = data.filter( appoinment => appoinment._id === appoinmentId.value)[0].time
            
        } else { 
            // estamos intentando crear una cita nueva, entonces inhabilito todos los horarios ya ocupados para la fecha que eligió el usuario (v497)
            appoinmentsByDate.value = data
        }
    })

    // ACTIONS vvv

    // esta funcion carga en el state la data de una cita editar a partir de la decision del usuario autenticado de editar alguna de sus citas ya reservadas (v495)
    function setSelectedAppoinment(appoinment) {
        services.value = appoinment.services
        date.value = convertToDDMMYYYY(appoinment.date)
        time.value = appoinment.time 
        appoinmentId.value = appoinment._id
    }

    // funcion para agregar un servicio al state cuando el usuario lo selecciona mientras esta creando una nueva cita 
    function onServiceSelected(service) {
        if(services.value.some(selectedService => selectedService._id === service._id)) {
            services.value = services.value.filter(selectedService => selectedService._id !== service._id)
        } else {
            if(services.value.length === 2) {
                alert("Máximo 2 servicios por cita")
                return
            } 
            services.value.push(service)
        }
    }
    
    // funcion para hacer un INSERT o un UPDATE en appoinments (funcion ejecutada desde el componente reutilzable \src\views\appoinments\AppoinmentView.vue)
    async function saveAppoinment() { 

        const appoinment = {
            services: services.value.map( service => service._id),
            date: convertToISO(date.value),
            time: time.value,
            totalAmount: totalAmount.value, // reutn del computedProperty totalAmount (?)
        }

        if(appoinmentId.value) {
            try {
                const { data } = await AppoinmentAPI.update(appoinmentId.value, appoinment) // PUT a http://localhost:4000/api/appoinments/:id_cita (v498)
                toast.open({
                    message: data.msg,
                    type: "success",
                })
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const { data } = await AppoinmentAPI.create(appoinment) // POST a http://localhost:4000/api/appoinment (v475)
                toast.open({
                    message: data.msg,
                    type: "success",
                })
            } catch (error) {
                console.log(error);
            }
        }

        // luego de cada INSERT o UPDATE de cita, actualizamos el state con las citas de un usuario (ejecutamos esta accion del store user que se encarga de cargarlas en el state mediante una peticion a la API) para que se renderizee el listado actualizado en tiempo real en el componente \src\views\appoinments\MyAppoinmentsView.vue (v499)
        user.getUserAppoinments()

        clearAppoinmentData() // reiniciamos todo el state relacionado a la cita creada o editada luego del INSERT o el UPDATE de la misma en DB (v477)
        router.push({ name: "my-appoinments" })
    }

    // funcion para reiniciar todo el state relacionado a la cita creada luego del INSERT de la misma en DB (v477)
    function clearAppoinmentData() {
        appoinmentId.value = ""
        services.value = []
        date.value = ""
        time.value = ""
    }

    // GETERS vvv
    const isServiceSelected = computed( () => {
        return (id) => services.value.some(service => service._id === id)
    })
    const noServicesSelected = computed( () => {
        return services.value.length === 0
    })
    const totalAmount = computed( () => {
        return services.value.reduce( (total, service) => total + service.price, 0)
    })

    // getter para verificar si todo el state para crear una nueva cita esta completo, y en ese caso, renderizar el "btn.Confirmar Reservación"
    const isValidReservation = computed( () => {
        return services.value.length && date.value.length && time.value.length
    })

    // getter para saber si ya hay fecha seleccionada para una nueva cita (v481)
    const isDateSelected = computed( () => { 
        return date.value ? true : false
    })
    
    // getter para ejecutar desde cada uno de los btn con un horario en \src\views\appoinments\AppoinmentView.vue, y determinar si lo habilitamos o no cuando el usuario esta seleccionando fecha y hora para una nueva cita (v482)
    // cuando un computed retorna un callback puede recibir parametros
    // en este caso, como el computed lo estamos usando desde los btns de una vista, necesitamos pasarle el horario de ese btn para que el computed pueda compararlo con los horarios ya ocupados para la fecha seleccionada (request a la API) y retornar "true" o "false" (en realidad el metodo find() que usamos en este computed retornará el objeto coincidente o undefined, pero cumple la funcion que necesitamos) vvv
    const disabledTime = computed( () => { 
        return (hour) => {
            /*
            appoinmentsByDate.value = [
                {_id: '66f89f19d3be92959e273f1b', time: '13:00'}
                {_id: '66f8a6c868a524c501a17e54', time: '10:00'}
            ]
            */
            return appoinmentsByDate.value.find(appoinment => appoinment.time === hour)
        }
    })
    
    return {
        // vars/consts

        // states
        services,
        date,
        hours,
        time,
        
        // getters
        isServiceSelected,
        totalAmount,
        noServicesSelected,
        isValidReservation,
        isDateSelected,
        disabledTime,

        // actions
        setSelectedAppoinment,
        onServiceSelected,
        saveAppoinment,
        clearAppoinmentData,
    }
})