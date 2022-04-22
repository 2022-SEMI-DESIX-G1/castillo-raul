const input = document.getElementById("number-input");
const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", createCard);

function createCard(e) {
  e.preventDefault();

  let arrNumbers = [];

  if (input.value !== "") {
    const length = input.value;

    arrNumbers = generateFibonacci(length);
  }

  console.log(arrNumbers);
}

const generateFibonacci = (length, array = [0, 1]) => {
  let numberOne, numberTwo;

  for (let i = array.length; i < length; i++) {
    numberOne = array[i - 1];
    numberTwo = array[i - 2];
    array.push(numberOne + numberTwo);
  }

  return array;
};
