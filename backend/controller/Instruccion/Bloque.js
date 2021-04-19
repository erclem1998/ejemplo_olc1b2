const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const Asignacion = require("./Asignacion");
const Cout = require("./Cout");
const Declaracion = require("./Declaracion");
const SentenciaIf = require("./If");
const CicloWhile = require("./While");

function Bloque(_instrucciones, _ambito){
    var cadena = ""
    _instrucciones.forEach(instruccion => {
        if(instruccion.tipo === TIPO_INSTRUCCION.COUT){
            cadena+=Cout(instruccion, _ambito)+'\n'
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.DECLARACION){
            var mensaje = Declaracion(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION){
            var mensaje = Asignacion(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.WHILE){
            var mensaje = CicloWhile(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.LLAMADA_METODO){
            const Exec = require("./Exec");
            var mensaje = Exec(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.IF){
            var mensaje = SentenciaIf(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
    });
    return cadena
}

module.exports = Bloque