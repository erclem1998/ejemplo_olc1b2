
/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"clase"               return 'clase'
"decimal"             return 'decimal'
"cadena"              return 'cadena'
"bandera"             return 'bandera'
"true"                return 'true'
"false"               return 'false'
"cout"               return 'cout'
"while"               return 'while'


"=="                   return 'igualigual'
"<"                   return 'menor'
","                   return 'coma'
";"                   return 'ptcoma'
"{"                   return 'llaveA'
"}"                   return 'llaveC'
"*"                   return 'multi'
"/"                   return 'div'
"-"                   return 'menos'
"+"                   return 'suma'
"^"                   return 'exponente'
"!"                   return 'not'
"%"                   return 'modulo'
"("                   return 'parA'
")"                   return 'parC'
"PI"                  return 'PI'
"E"                   return 'E'

([a-zA-Z])([a-zA-Z0-9_])* return 'identificador'
["\""]([^"\""])*["\""] return 'string'

<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%left 'igualigual'
%left 'suma' 'menos'
%left 'multi' 'div' 'modulo' 
%left 'exponente'
%right 'not'

%left umenos

%start INICIO

%% /* language grammar */

INICIO: clase identificador llaveA OPCIONESCUERPO llaveC EOF
;

OPCIONESCUERPO: CUERPO OPCIONESCUERPO
              | CUERPO
;

CUERPO: DEC_VAR
      | DEC_MET
;

DEC_VAR: TIPO identificador ptcoma
       | TIPO identificador menor menos EXPRESION ptcoma
;

TIPO: decimal
    | cadena
    | bandera
;


EXPRESION: EXPRESION suma EXPRESION
         | EXPRESION menos EXPRESION
         | EXPRESION multi EXPRESION
         | EXPRESION div EXPRESION
         | EXPRESION exponente EXPRESION
         | EXPRESION modulo EXPRESION
         | menos EXPRESION %prec umenos
         | parA EXPRESION parC
         | EXPRESION igualigual EXPRESION
         | NUMBER
         | true
         | false
         | string
         | identificador
;

DEC_MET : identificador parA parC llaveA OPCIONESMETODO llaveC
        | identificador parA LISTAPARAMETROS parC llaveA OPCIONESMETODO llaveC
;

LISTAPARAMETROS: LISTAPARAMETROS coma  PARAMETROS
               | PARAMETROS
;

PARAMETROS: TIPO identificador
;

OPCIONESMETODO: CUERPOMETODO OPCIONESMETODO
              | CUERPOMETODO
;

CUERPOMETODO: DEC_VAR
            | IMPRIMIR
            | WHILE
;

IMPRIMIR: cout menor menor EXPRESION ptcoma
;

WHILE: while parA EXPRESION parC llaveA CUERPOMETODO llaveC
;