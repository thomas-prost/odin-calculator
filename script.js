let operator = "";
let firstOperand = [];
let secondOperand = [];
let onScreen = [];
let containsOperator = false;
let previousResult = null;

const displayValue = document.querySelector("#displayValue");
const buttons = document.querySelectorAll("button");
const clear = document.querySelector("#clear");

function add(a, b) {
  onScreen = [a + b];
}

function subtract(a, b) {
  onScreen = [a - b];
}

function multiply(a, b) {
  onScreen = [a * b];
}

function divide(a, b) {
  onScreen = [a / b];
}

function operate(a, b, operator) {
  if (operator === "add") {
    add(a, b);
  }
  if (operator === "subtract") {
    subtract(a, b);
  }
  if (operator === "multiply") {
    multiply(a, b);
  }
  if (operator === "divide") {
    divide(a, b);
  }
}

function resetScreen() {
  firstOperand = [];
  secondOperand = [];
  onScreen = [];
  containsOperator = false;
  updateDisplayValue();
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("number")) {
      if (firstOperand != []) {
        secondOperand.push(button.id);
        onScreen.push(button.id);
        updateDisplayValue();
      }
    }
    if (button.id === "clear") {
      resetScreen();
    }
    if (button.classList.contains("operation") && containsOperator == false) {
      if (button.id === "add") addAdditionSign();
      else if (button.id === "subtract") addSubtractSign();
      else if (button.id === "multiply") addMultiplySign();
      else if (button.id === "divide") addDivideSign();
      updateDisplayValue();
      containsOperator = true;
      firstOperand = secondOperand;
      secondOperand = [];
    }
    if (
      button.classList.contains("total") &&
      firstOperand != [] &&
      operator != "" &&
      secondOperand != []
    ) {
      if (typeof firstOperand[0] === "number") {
        firstOperand.splice(1, Infinity);
      }
      operate(
        Number(firstOperand.join("")),
        Number(secondOperand.join("")),
        operator
      );
      updateFinalValue();
      containsOperator = false;
      firstOperand = [];
      operator = "";
      secondOperand[0] = previousResult;
    }
  });
  button.addEventListener("mousedown", () => {
    button.classList.add(button.classList.item(1) + "-pressed");
  });
  button.addEventListener("mouseup", () => {
    button.classList.remove(button.classList.item(1) + "-pressed");
  });
});

function addAdditionSign() {
  onScreen.push(" + ");
  operator = "add";
}

function addSubtractSign() {
  onScreen.push(" - ");
  operator = "subtract";
}

function addMultiplySign() {
  onScreen.push(" x ");
  operator = "multiply";
}

function addDivideSign() {
  onScreen.push(" / ");
  operator = "divide";
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function updateDisplayValue() {
  displayValue.textContent = onScreen.join("");
}

function updateFinalValue() {
  displayValue.textContent = roundResult(Number(onScreen.join("")));
  previousResult = roundResult(Number(onScreen.join("")));
}
