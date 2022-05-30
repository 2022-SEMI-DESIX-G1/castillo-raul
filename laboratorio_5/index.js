((Utils) => {
  const App = {
    htmlElements: {
      input: document.getElementById("number-input"),
      submitButton: document.getElementById("submit"),
      cardContainer: document.getElementById("cards"),
    },
    init: () => {
      App.htmlElements.submitButton.addEventListener(
        "click",
        App.handlers.onSubmitForm
      );
    },
    utils: {
      ...Utils.methods,
    },
    handlers: {
      onSubmitForm: (e) => {
        e.preventDefault();

        while (App.htmlElements.cardContainer.firstChild) {
          App.htmlElements.cardContainer.removeChild(
            App.htmlElements.cardContainer.firstChild
          );
        }

        const length = App.htmlElements.input.value;

        let arrNumbers = [];

        arrNumbers =
          length > 0 ? (arrNumbers = App.utils.generateFibonacci(length)) : [];

        if (arrNumbers.length > 0) {
          arrNumbers.forEach((number) => {
            App.htmlElements.cardContainer.innerHTML +=
              App.templates.card(number);
          });
        }

        const cards = document.querySelectorAll(".card");

        cards.forEach((e) => {
          e.addEventListener("click", App.handlers.onClickDeleteCard);
        });
      },
      onClickDeleteCard: (e) => {
        console.log(e.target);
        const response = confirm(`¿ Deseas eliminar esta tarjeta ?`);
        if (response && e.target.className === "card") {
          e.target.remove();
        }
      },
    },
    templates: {
      card: (number) => {
        return `<div class="card">
          <h3>${number}</h3>
        </div>`;
      },
    },
  };
  App.init();
})(document.Utils);
