const Ambito = require("../Ambito/Ambito");
const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operacion/Operacion");

function SentenciaIf(_instruccion, _ambito){
    var mensaje = ""
    var operacion = Operacion(_instruccion.expresion, _ambito);
    if(operacion.tipo === TIPO_DATO.BANDERA){
        if(operacion.valor){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require("./Bloque");
            mensaje += Bloque(_instruccion.instrucciones,nuevoAmbito)
        }
        return mensaje
    }
    return `Error: No es una condicion válida para el if... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = SentenciaIf