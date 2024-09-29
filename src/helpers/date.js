// archivo para helpers relacionados a las fechas (creado en el v476)

import { parse, formatISO } from "date-fns" // funciones de la libreria date-fns, importada en v476

// funcion para convertir una fecha en formato string ("dd/MM/yyyy") en un formato ISO, que es el formato que MongoDB utiliza para almacenar fechas (v476)
export function convertToISO(strDate){
    const newDate = parse(strDate, "dd/MM/yyyy", new Date())
    return formatISO(newDate)
}