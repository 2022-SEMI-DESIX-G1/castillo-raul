const input = document.getElementById("number-input");
const submitButton = document.getElementById("submit");
const cardContainer = document.getElementById("cards");

submitButton.addEventListener("click", createCard);

function createCard(e) {
  e.preventDefault();

  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }

  const length = input.value;

  let arrNumbers = [];

  if (length > 0) {
    arrNumbers = generateFibonacci(length);
  }

  if (arrNumbers.length > 0) {
    for (let i = 0; i < arrNumbers.length; i++) {
      let card = document.createElement("div");
      let title = document.createElement("h3");
      card.classList.add("card");
      title.innerText = arrNumbers[i];
      card.appendChild(title);
      cardContainer.appendChild(card);
    }
  }
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
