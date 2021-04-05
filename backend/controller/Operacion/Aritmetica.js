const TIPO_DATO = require("../Enums/TipoDato")
const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor")
const TipoResultado = require("./TipoResultado")
const ValorExpresion = require("./ValorExpresion")

function Aritmetica(_expresion, _ambito){
    //2+3+5+6+8+9
    if(_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.BANDERA ||
        _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR){
        return ValorExpresion(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.SUMA){// 2+6+7+2+9+10
        return suma(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.RESTA){// 2+6+7+2+9+10
        return resta(_expresion.opIzq, _expresion.opDer, _ambito)
    }
}

function suma(_opIzq, _opDer, _ambito){ 
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo)
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.DECIMAL){
            const resultado = Number(opIzq.valor) + Number(opDer.valor);
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
        else if(tipoRes === TIPO_DATO.CADENA){
            const resultado = opIzq.valor.toString() + opDer.valor.toString();
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion suma... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function resta(_opIzq, _opDer, _ambito){
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo)
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.DECIMAL){
            const resultado = Number(opIzq.valor) - Number(opDer.valor);
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion suma... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

module.exports = Aritmetica