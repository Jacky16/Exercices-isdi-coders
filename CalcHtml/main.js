const equalButton = document.getElementById("equalButton");
let currentNumbers = [];
let currentNumber;
let total = 0;

const calculator = {
  displayValue: "",
  firstOperand: null,
  isSecondOperand: false,
  operator: null,
};
const calculations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
  "%": (a) => a / 100,
};
let isMinus = false;
window.addEventListener("load", () => {
  const buttons = document.querySelectorAll("button");
  const display = document.getElementById("display");
  darkMode();

  function updateDisplay() {
    display.innerText = calculator.displayValue;
  }
  updateDisplay();
  function performCalculator(operator) {
    const value = parseFloat(calculator.displayValue);

    if (calculator.firstOperand == null) {
      calculator.firstOperand = value;
    } else if (calculator.operator) {
      const result = calculations[calculator.operator](
        calculator.firstOperand,
        value
      );
      calculator.displayValue = result;
      calculator.firstOperand = result;
    }
    calculator.isSecondOperand = true;
    calculator.operator = operator;
    updateDisplay();
  }
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.innerText;
      if (key === "dark_mode") return;
      if (key === "C") {
        calculator.displayValue = "";
        calculator.firstOperand = null;
        calculator.isSecondOperand = false;
        calculator.operator = null;
      } else if (key === "=") {
        performCalculator(calculator.operator);
        calculator.operator = null;
      } else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "%"
      ) {
        performCalculator(key);
      } else if (key === ".") {
        if (!calculator.displayValue.includes(".")) {
          calculator.displayValue += ".";
        }
      } else if (key === "+/-") {
        if (!calculator.displayValue.includes("-")) {
          const str = "-" + calculator.displayValue;
          calculator.displayValue = str;
        } else {
          const str = calculator.displayValue.replace("-", "");
          calculator.displayValue = str;
        }
      } else {
        if (calculator.isSecondOperand) {
          calculator.displayValue = key;
          calculator.isSecondOperand = false;
        } else {
          calculator.displayValue += key;
        }
      }
      updateDisplay();
    });
  });
});
function darkMode() {
  const boton = document.querySelector("#btn-darkMode");
  const prefresDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    document.body.classList.toggle("dark-theme");
  } else if (currentTheme === "light") {
    document.body.classList.toggle("light-theme");
  }

  boton.addEventListener("click", () => {
    let theme;
    if (prefresDarkScheme.matches) {
      document.body.classList.toggle("light-theme");
      theme = document.body.classList.contains("light-theme")
        ? "light"
        : "dark";
    } else {
      document.body.classList.toggle("dark-theme");
      theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
    }
    localStorage.setItem("theme", theme);
  });
}
