(() => {
  const App = {
    config: {
      apiBaseUrl: "http://localhost:3000/pokemon",
    },
    htmlElements: {
      form: document.querySelector("#pokemon-form"),
      input: document.querySelector("#pokemon-input"),
      checkboxList: document.getElementsByName("check-input"),
    },
    init: () => {
      App.htmlElements.form.addEventListener(
        "submit",
        App.handlers.handleFormSubmit
      );
    },
    handlers: {
      handleFormSubmit: async (e) => {
        e.preventDefault();
        const pokemon = App.htmlElements.input.value;
        const url = App.utils.getUrl({ pokemon });

        const { data } = await axios.post(url);
        console.log({ data });

        const checkboxes = App.htmlElements.checkboxList;
        let checkboxValues = [];

        for (let index = 0; index < checkboxes.length; index++) {
          if (checkboxes[index].checked == true) {
            checkboxValues.push(checkboxes[index].value);
          }
        }
      },
    },
    utils: {
      getUrl: ({ pokemon }) => {
        return `${App.config.apiBaseUrl}/${pokemon}`;
      },
      getEvolution: (id) => {
        return `${App.config.apiBaseUrl}/${id}`;
      },
    },
    templates: {
      
    },
  };
  App.init();
})();
