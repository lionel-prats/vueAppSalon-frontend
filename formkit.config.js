// en el archivo formkit.config.js del proyecto Point Of Sale, hay muchas notas para entender como se configura este archivo

// extraemos la funcion generateClasses de la depenencia @formkit/themes (instalada en v348), que nos va a permitir defenir estilos custom para nuestros forms de formkit
import { generateClasses } from "@formkit/themes"

const config = {
    config: {
        classes: generateClasses({

            // los atributos que definamos en este objeto aplicaran para todos los elementos de Formkit
            global: {
               // wrapper es la clase del <div> que contiene a un <label> y su correspondiente <input> en el diseño de Formkit (inspeccionar en devtools)
               wrapper: "space-y-2 mb-3",
               
               // mensajes de error de validacion
               message: "bg-red-500 text-white text-center text-sm font-bold uppercase p-2 my-5",
               
               label: "block mb-1 font-bold text-lg text-white",
               input: "w-full p-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400",
            },

            // en este objeto aplicamos clases de tailwind a inputs o buttons submit de nuestros forms de Formkit
            submit: {
               // con $reset elimino para los inputs o buttons submit los estilos globales definidos mas arriba para todos los inputs, y luego aplico los estilos que le quiero dar a todos los inputs submit de los form de Formkit (v323)
               input: "$reset bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-bold w-full p-3 mt-10" 
            },
            
            // en este objeto aplicamos clases de tailwind a inputs file de nuestros forms de Formkit
            /* file: {
                // estilos para la leyenda "No file chosen" que se muestra debajo de u input file cuando el usuario no ha cargado ningun archivo (v322)
                noFiles: "block my-2",
                
                // oculto el nombre del archivo cargado por el usuario en el input que se muestra debajo del onput (v322)
                fileItem: "hidden",
            }, */
            
            // en este objeto aplicamos clases de tailwind a inputs number de nuestros forms de Formkit
            /* number: {
                // message: "text-red-500",
            }, */
            
            // en este objeto aplicamos clases de tailwind a selects de nuestros forms de Formkit
            /* select: {
                // message: "text-red-500",
            }, */

            // en este objeto aplicamos clases de tailwind a inputs text de nuestros forms de Formkit
            /* text: {
                // con $reset elimino para los mensajes de error de los inputs text todos los estilos globales que pueda haber definido en la key "global" mas arriba y darle estilos solamente para los error messages de estos inputs text (v321)
                // message: "$reset text-green-500",
            }, */

        })
    }
}

export default config