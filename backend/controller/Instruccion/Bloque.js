const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const Cout = require("./Cout");

function Bloque(_instrucciones, _ambito){
    var cadena = ""
    _instrucciones.forEach(instruccion => {
        if(instruccion.tipo === TIPO_INSTRUCCION.COUT){
            cadena+=Cout(instruccion, _ambito)+'\n'
        }
    });
    return cadena
}

module.exports = Bloque