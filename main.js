/* Punto 2 */
var num1 = 2;
var num2 = 2;

function suma(n1, n2) {
  return n1 + n2;
}

function resta(n1, n2) {
  return n1 - n2;
}

function multiplicacion(n1, n2) {
  return n1 * n2;
}

function division(n1, n2) {
  return n1 / n2;
}

console.log(`La suma de ${num1} y ${num2} es ${suma(num1, num2)}`);
console.log(`La resta de ${num1} y ${num2} es ${resta(num1, num2)}`);
console.log(`La multiplicacion de ${num1} y ${num2} es ${multiplicacion(num1, num2)}`);
console.log(`La division de ${num1} y ${num2} es ${division(num1, num2)}`);

/* Punto 3 */
let string1 = 'cadena 1';
let string2 = 'cadena 2';

console.log(`Resultado de la concatenacion: ${string1} ${string2}`);

/* Punto 4 */
const variableType1 = undefined;
const variableType2 = 'Hola!';

console.log(`El tipo de variable 1 es: ${typeof variableType1}`);
console.log(`El tipo de variable 2 es: ${typeof variableType2}`);

/* Punto 5 */
let objectType = {
    entero: 2,
    cadena: 'Soy un string',
    booleano: true,
    objetoVacio: {}
}

console.log(objectType);