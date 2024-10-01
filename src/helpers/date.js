// archivo para helpers relacionados a las fechas (creado en el v476)

import { parse, formatISO, parseISO, format } from "date-fns" // funciones de la libreria date-fns, importada en v476|v488

import es from "date-fns/locale/es" // paquete de idiomas es (español) de la libreria date-fns (v488)


// funcion para castear una fecha de formato string ("dd/MM/yyyy") a un formato ISO, que es el formato que MongoDB utiliza para almacenar fechas (v476)
export function convertToISO(strDate){
    const newDate = parse(strDate, "dd/MM/yyyy", new Date())
    return formatISO(newDate)
}

// helper para castear las fechas Date que nos llegan de la DB Mongo, y que vienen en formato ISO, a un formato string del tipo "Friday, April 29th, 1453" para renderizar en pantalla (v488)
export function displayDate(date) {
    const newDate = parseISO(date)
    // documentacion date-fns -> https://date-fns.org/v4.1.0/docs/format
    // "PPPP" -> Friday, April 29th, 1453
    const formattedDate = format(newDate, "PPPP", { locale: es })
    return formattedDate
}

// helper para castear una fecha en formato ISO a fecha en formta string "dd/MM/yyyy" (v496)
export function convertToDDMMYYYY(isoDate) {
    const newDate = new Date(isoDate)
    const formattedDate = format(newDate, "dd/MM/yyyy")
    return formattedDate
}