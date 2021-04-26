const Ambito = require("../Ambito/Ambito");
const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operacion/Operacion");

function SentenciaIfElseIf(_instruccion, _ambito) {
    var mensaje = ""
    var operacion = Operacion(_instruccion.expresion, _ambito);
    var hayBreak = false
    //console.log(operacion)
    if (operacion.tipo === TIPO_DATO.BANDERA) {
        //console.log(operacion)
        if (operacion.valor) {
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require("./Bloque");
            var ejec = Bloque(_instruccion.instruccionesIf, nuevoAmbito)
            hayBreak = ejec.hayBreak;
            mensaje += ejec.cadena
            return {
                hayBreak: hayBreak,
                cadena: mensaje
            }
            //mensaje += Bloque(_instruccion.instrucciones,nuevoAmbito)
        }
        //buscando un else if
        for (let i = 0; i < _instruccion.lista_elseif.length; i++) {
            var op = Operacion(_instruccion.lista_elseif[i].expresion, _ambito)
            if (op.tipo === TIPO_DATO.BANDERA) {
                if (op.valor) {
                    var nuevoAmbito = new Ambito(_ambito)
                    const Bloque = require("./Bloque");
                    var ejec = Bloque(_instruccion.lista_elseif[i].instruccionesElseIf, nuevoAmbito)
                    hayBreak = ejec.hayBreak;
                    mensaje += ejec.cadena
                    return {
                        hayBreak: hayBreak,
                        cadena: mensaje
                    }
                }
            }
            else {
                mensaje += `Error: No es una condicion válida para el if... Linea: ${_instruccion.lista_elseif[i].linea} Columna: ${_instruccion.lista_elseif[i].columna}`
            }
        }
        if(_instruccion.instruccionesElse!=null){
            const Bloque = require("./Bloque");
            var ejec = Bloque(_instruccion.instruccionesElse, nuevoAmbito)
            hayBreak = ejec.hayBreak;
            mensaje += ejec.cadena
        }
        return {
            hayBreak: hayBreak,
            cadena: mensaje
        }
    }
    return {
        hayBreak: hayBreak,
        cadena: `Error: No es una condicion válida para el if... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
    }
}

module.exports = SentenciaIfElseIf