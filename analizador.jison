
/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"clase"               return 'clase'
"entero"              return 'entero'
"cadena"              return 'cadena'
"bandera"             return 'bandera'
"true"                return 'true'
"false"               return 'false'


"<"                   return 'menor'
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

<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%left 'suma' 'menos'
%left 'multi' 'div'
%left 'exponente'
%right 'not'
%right 'modulo'

%start INICIO

%% /* language grammar */

INICIO: clase identificador llaveA CUERPO llaveC EOF
;

CUERPO: DEC_VAR
;

DEC_VAR: DEC_VAR TIPO identificador ptcoma
       | TIPO identificador ptcoma
       | DEC_VAR TIPO identificador menor menos EXPRESION ptcoma
       | TIPO identificador menor menos EXPRESION ptcoma
;

TIPO: entero
    | cadena
    | bandera
;


EXPRESION: EXPRESION suma EXPRESION
         | EXPRESION menos EXPRESION
         | EXPRESION multi EXPRESION
         | NUMBER
;