/** Punto 1 */
let number = 585;

const isPalindrome = (t, base) => {
  let convertedNumber = "";

  if (t > 0) {
    convertedNumber = t.toString(base);
  }

  let reverseNumber = convertedNumber.split("").reverse().join("");

  return convertedNumber === reverseNumber ? true : false;
};

console.log(
  `El numero ${number} ${
    isPalindrome(number, 10) && isPalindrome(number, 2) ? "es" : "no es"
  } palindromo de doble base`
);

/** Punto 2 */
let t = "AABBBACAA";

const stringSize = (text) => {
  let objChars = {};
  let textDivided = text.split("");

  textDivided.forEach((element) => {
    objChars[element] = (objChars[element] || 0) + 1;
  });

  return objChars;
};

console.log(stringSize(t));

/* Punto 3 */
let a = 2001;
const isLeapYear = (year) => {
  const result =
    year % 400 === 0 ? true : year % 100 === 0 ? false : year % 4 === 0;

  return result;
};

console.log(`El año ${a} ${isLeapYear(a) ? "es" : "no es"} bisiesto`);

/* Punto 4 */
let n = 7;

let isPrime = (number) => {
  let square = Math.sqrt(number);

  for (let index = 2; index <= square; index++) {
    if (number % index === 0) {
      return false;
    }
  }

  return number > 1;
};

const sumPrimeNumbers = (number) => {
  let summary = 1;
  for (let index = 0; index <= number; index++) {
    summary += isPrime(index) ? index : 0;
  }
  return summary;
};

console.log(
  `La sumatoria de los numeros primos menores a ${n} es: ${sumPrimeNumbers(n)}`
);
