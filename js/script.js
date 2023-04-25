class AtuoJump {
  constructor(elm, config) {
    const container = document.querySelector(elm);
    ///For use throughout the class
    this.config = config;
    this.container = container;

    /// Limit characters for input .... here 4
    container.addEventListener("keypress", (e) => {
      if (e.target.tagName === "INPUT") {
        if (parseInt(e.target.value.length) >= config.inputLength) {
          e.returnValue = false;
        }
      }
    });

    //manage jump process ---- jump next element
    /// we use Event Delegation feature
    container.addEventListener("keyup", (e) => {
      if (e.target.tagName === "INPUT") {
        const value = e.target.value;

        if (e.key !== "Backspace" && value.length === config.inputLength) {
          // use event target for find active elemnt now
          const currentElement = +e.target.getAttribute("data-order");
          const nextElement = container.querySelector(
            `[data-order="${currentElement + 1}"]`
          );
          if (nextElement !== null) {
            nextElement.focus();
          } else {
            if (this.isFinish()) {
              if (config.onFinish) {
                config.onFinish();
              }
            }
          }
        }
      }
    });

    //manage jump process ---- jump pervious element just for Backspace key
    /// we use Event Delegation feature
    container.addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT" && e.key === "Backspace") {
        const value = e.target.value;
        if (value.length === 0) {
          const currentElement = +e.target.getAttribute("data-order");
          const perviousElement = container.querySelector(
            `[data-order="${currentElement - 1}"]`
          );

          if (perviousElement !== null) {
            perviousElement.focus();
          }
        }
      }
    });
  }

  isFinish() {
    const inputs = this.container.querySelectorAll("input");
    /// nodeList convert to Array
    const emptyArray = Array.from(inputs).filter((item) => {
      return item.value === "";
    });

    return emptyArray.length === 0;
  }
}

new AtuoJump(".container", {
  inputLength: 4,
  onFinish() {
    console.log("finish");
  },
});
