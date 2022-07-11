let results = [];
const inputUser = [];

function calc() {
  let numberOne = prompt("Ingrese el primer número");
  let numberTwo = prompt("Ingrese el segundo número");
  if (!isNaN(numberOne) && numberTwo == "") {
    //Calcular raiz cuadrada
    console.log(
      "La raiz cuadrada de " +
        numberOne +
        " es: " +
        Math.sqrt(numberOne).toFixed(3)
    );
  } else if (isNaN(numberOne) || isNaN(numberTwo)) {
    console.log("Ingrese numeros validos");
  } else {
    numberOne = parseFloat(numberOne);
    numberTwo = parseFloat(numberTwo);
    sum(numberOne, numberTwo);
    sub(numberOne, numberTwo);
    mul(numberOne, numberTwo);
    div(numberOne, numberTwo);
    showResults();
  }
}

function sum(a, b) {
  let acc = 0;
  for (num in arguments) {
    acc += arguments[num];
  }
  results.push(a + b);
}
function sub(a, b) {
  let acc = 0;
  for (num in arguments) {
    acc = acc - arguments[parseInt(num)];
  }
  results.push(a - b);
}
function mul(a, b) {
  let acc = 1;
  for (num in arguments) {
    acc *= arguments[num];
  }
  results.push(a * b);
}
function div(a, b) {
  let acc = 1;
  for (num in arguments) {
    acc /= arguments[num];
  }
  results.push(a / b);
}
function showResults() {
  console.log(results);
  let countResults = 0;
  for (num in results) {
    if (countResults === 5) {
      console.log("---------------------------");
      countResults = 0;
    } else {
      if (num == 0) {
        console.log("La suma es: " + results[num]);
      } else if (num == 1) {
        console.log("La resta es: " + results[num]);
      } else if (num == 2) {
        console.log("La multiplicación es: " + results[num]);
      } else if (num == 3) {
        console.log("La división es: " + results[num]);
      } else if (num == 4) {
        console.log("La raiz cuadrada es: " + results[num]);
      }
      countResults++;
    }
  }
}

calc();
