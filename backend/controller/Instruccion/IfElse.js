const Ambito = require("../Ambito/Ambito");
const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operacion/Operacion");

function SentenciaIfElse(_instruccion, _ambito){
    var mensaje = ""
    var operacion = Operacion(_instruccion.expresion, _ambito);
    var hayBreak=false
    //console.log(operacion)
    if(operacion.tipo === TIPO_DATO.BANDERA){
        //console.log(operacion)
        if(operacion.valor){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require("./Bloque");
            var ejec = Bloque(_instruccion.instruccionesIf,nuevoAmbito)
            hayBreak= ejec.hayBreak;
            mensaje+=ejec.cadena
            //mensaje += Bloque(_instruccion.instrucciones,nuevoAmbito)
        }
        else{
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require("./Bloque");
            var ejec = Bloque(_instruccion.instruccionesElse,nuevoAmbito)
            hayBreak= ejec.hayBreak;
            mensaje+=ejec.cadena
        }
        return {
            hayBreak: hayBreak,
            cadena: mensaje
        }
    }
    return {
        hayBreak: hayBreak,
        cadena:  `Error: No es una condicion válida para el if... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
    }
}

module.exports = SentenciaIfElse