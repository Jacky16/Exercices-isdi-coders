let results = [];
let inputsUser = [];

function sum() {
  let acc = arguments[0];
  for (let i = 1; i < arguments.length; i++) {
    acc += arguments[i];
  }
  return acc;
}
function sub() {
  let acc = arguments[0];
  for (let i = 1; i < arguments.length; i++) {
    acc -= arguments[i];
  }
  return acc;
}
function mul() {
  let acc = arguments[0];
  for (let i = 1; i < arguments.length; i++) {
    acc *= arguments[i];
  }
  return acc;
}
function div() {
  let acc = arguments[0];
  for (let i = 1; i < arguments.length; i++) {
    acc /= arguments[i];
  }
  return acc;
}

const showResults = () => {
  console.clear();
  results.forEach((result) => {
    console.log(`Operación: ${results.indexOf(result) + 1}`);
    console.log("---------------------------------");
    if (result.sum != undefined)
      console.log(`El resultado de la suma es: ${result.sum}`);
    if (result.sub != undefined)
      console.log(`El resultado de la resta es: ${result.sub}`);
    if (result.mul != undefined)
      console.log(`El resultado de la multiplicación es: ${result.mul}`);
    if (result.div != undefined)
      console.log(`El resultado de la división es: ${result.div}`);
    if (result.sqrt != undefined)
      console.log(`El resultado de la raiz cuadrada es: ${result.sqrt}`);
    console.log("---------------------------------");
  });
};
const askUserNumbers = () => {
  const inputNumber = prompt(
    "Ingrese un número y haz click en 'Aceptar' para añadirlo // Pulse aceptar con el campo vacio para calcular // Si introduce un numero, se calculará la raiz cuadrada"
  );

  if (Number(inputNumber) != isNaN && inputNumber != "") {
    inputsUser.push(Number(inputNumber));
    askUserNumbers();
  } else if (inputNumber == "") {
    calculate();
  }
};
const askAgain = () => {
  const input = prompt("¿Desea calcular otro número? (s/n)");
  if (input === "s") {
    inputsUser = [];
    askUserNumbers();
  } else if ((input === "n") | (input == null)) {
    console.log("Hasta luego");
    return;
  } else if ((input == "") | (Number(input) == isNaN)) {
    alert("Ingrese una opción válida");
    askAgain();
  }
};
const calculate = () => {
  const sizeInputs = inputsUser.length;
  if (sizeInputs === 1) {
    const sqrtResult = Math.sqrt(inputsUser[0]).toFixed(3);
    const result = { sqrt: sqrtResult };
    results.push(result);
    showResults();
  } else if (sizeInputs > 1) {
    const result = {
      sum: sum(...inputsUser),
      sub: sub(...inputsUser),
      mul: mul(...inputsUser),
      div: div(...inputsUser),
    };
    results.push(result);
  }
  showResults();

  askAgain();
};

const main = () => {
  askUserNumbers();
};
main();
