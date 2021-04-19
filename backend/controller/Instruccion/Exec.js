const Ambito = require("../Ambito/Ambito")
const Bloque = require("./Bloque")

function Exec(_instruccion, _ambito){
    var metodoEjecutar = _ambito.getMetodo(_instruccion.nombre)
    if(metodoEjecutar!=null){
        var nuevoAmbito = new Ambito(_ambito)
        return Bloque(metodoEjecutar.instrucciones, nuevoAmbito)
    }
    return `Error: El método ${_instruccion.nombre} no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = Exec