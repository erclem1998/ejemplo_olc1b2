const Ambito = require("../Ambito/Ambito")
const Bloque = require("./Bloque")
const DecParametro = require("./DecParametro")
const Instruccion = require("./Instruccion")

function Exec(_instruccion, _ambito) {
    var cadena = ""
    var metodoEjecutar = _ambito.getMetodo(_instruccion.nombre)
    //console.log(metodoEjecutar.instrucciones)
    if (metodoEjecutar != null) {
        var nuevoAmbito = new Ambito(_ambito)
        //verificamos si es un metodo con parametros
        if (metodoEjecutar.lista_parametros != null) {
            //verificamos que la cantidad de valores coincida con la cantidad de parametros
            if (_instruccion.lista_valores != null && metodoEjecutar.lista_parametros.length == _instruccion.lista_valores.length) {
                //console.log("es un metodo con "+metodoEjecutar.lista_parametros.length+" parametros")
                var error = false;
                for (let i = 0; i < metodoEjecutar.lista_parametros.length; i++) {
                    var declaracionAsignacion = Instruccion.nuevaDeclaracion(metodoEjecutar.lista_parametros[i].id, _instruccion.lista_valores[i], metodoEjecutar.lista_parametros[i].tipo_dato, _instruccion.linea, _instruccion.columna)
                    //console.log(declaracionAsignacion)
                    var mensaje = DecParametro(declaracionAsignacion, nuevoAmbito)
                    if (mensaje != null) {
                        error = true
                        cadena += mensaje + '\n'
                    }
                }
                if (error) {
                    return cadena
                }
                //console.log(nuevoAmbito)
                var ejec = Bloque(metodoEjecutar.instrucciones, nuevoAmbito)
                var mensaje = ejec.cadena
                if (ejec.hayBreak) {
                    mensaje += `Error: Se ha encontrado un break fuera de un ciclo`
                }
                return mensaje
                //return Bloque(metodoEjecutar.instrucciones, nuevoAmbito) 
                //return cadena;
            }
            else {
                return `Error: Faltan valores para el metodo ${_instruccion.nombre}... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
            }
        }
        else {
            var ejec = Bloque(metodoEjecutar.instrucciones, nuevoAmbito)
            var mensaje = ejec.cadena
            if (ejec.hayBreak) {
                mensaje += `Error: Se ha encontrado un break fuera de un ciclo`
            }
            return mensaje
        }
    }
    return `Error: El método ${_instruccion.nombre} no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = Exec