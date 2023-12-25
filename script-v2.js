const buttons = document.querySelectorAll("button");
const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const removeButton = document.querySelector(".remove");
const totalButton = document.querySelector(".total");
const decimalButton = document.querySelector(".decimal");
const displayValue = document.querySelector("#displayValue");

let currentOperator = "";
let firstOperand = null;
let secondOperand = null;
let onScreen = displayValue;

buttons.forEach((button) => {
  button.addEventListener("mousedown", () => {
    button.classList.add(button.classList.item(1) + "-pressed");
  });
  button.addEventListener("mouseup", () => {
    button.classList.remove(button.classList.item(1) + "-pressed");
  });
});
numberButtons.forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.textContent));
});
operationButtons.forEach((button) => {
  button.addEventListener("click", () => setOperation(button.textContent));
});
removeButton.addEventListener("click", resetScreen);
totalButton.addEventListener("click", evaluate);
decimalButton.addEventListener("click", appendDecimal);
window.addEventListener("keydown", keyboardInput);

function keyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === ".") appendNumber(".");
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "Backspace" || e.key === "C" || e.key === "c") resetScreen();
  if (e.key === "+" || e.key === "-" || e.key === "/") setOperation(e.key);
  if (e.key === "x" || e.key === "*") setOperation("×");
}

function appendNumber(number) {
  if (number === "0" && onScreen.textContent === "") return;
  else if (onScreen.textContent === "IMPOSSIBLE") onScreen.textContent = number;
  else if (onScreen.textContent === "0") onScreen.textContent = number;
  else onScreen.textContent += number;
}

function appendDecimal() {
  if (!onScreen.textContent.includes(" ")) {
    if (onScreen.textContent.includes(".")) return;
    else onScreen.textContent += ".";
  } else {
    if (onScreen.textContent.slice(firstOperand.length + 3).includes("."))
      return;
    else onScreen.textContent += ".";
  }
}

function setOperation(operator) {
  if (
    onScreen.textContent === "" ||
    onScreen.textContent === "0" ||
    onScreen.textContent === "IMPOSSIBLE"
  )
    return;
  else currentOperator = operator;
  firstOperand = onScreen.textContent;
  onScreen.textContent += " " + operator + " ";
}

function evaluate() {
  secondOperand = onScreen.textContent.slice(firstOperand.length + 3);
  if (secondOperand === "") {
    secondOperand = null;
    return;
  } else operate(currentOperator, firstOperand, secondOperand);
}

function add(a, b) {
  onScreen.textContent = Math.round((Number(a) + Number(b)) * 1000) / 1000;
}

function subtract(a, b) {
  onScreen.textContent = Math.round((Number(a) - Number(b)) * 1000) / 1000;
}

function multiply(a, b) {
  onScreen.textContent = Math.round(Number(a) * Number(b) * 1000) / 1000;
}

function divide(a, b) {
  if (Number(a) === 0 || Number(b) === 0) {
    onScreen.textContent = "IMPOSSIBLE";
    firstOperand = null;
    secondOperand = null;
    currentOperator = "";
  } else
    onScreen.textContent = Math.round((Number(a) / Number(b)) * 1000) / 1000;
}

function operate(operator, a, b) {
  if (operator === "+") {
    add(a, b);
  }
  if (operator === "-") {
    subtract(a, b);
  }
  if (operator === "×") {
    multiply(a, b);
  }
  if (operator === "/") {
    divide(a, b);
  }
}

function resetScreen() {
  firstOperand = null;
  secondOperand = null;
  containsOperator = false;
  onScreen.textContent = "";
}
