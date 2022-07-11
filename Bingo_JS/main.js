const bingoCard = [
  { number: 1, matched: true },
  { number: 2, matched: false },
  { number: 3, matched: true },
  { number: 4, matched: true },
  { number: 5, matched: true },

  //next line
  { number: 6, matched: true },
  { number: 7, matched: true },
  { number: 8, matched: true },
  { number: 9, matched: true },
  { number: 10, matched: true },
];
let finishGame = false;

function bingo() {
  const namePlayer = prompt("Como te llamas?");
  console.log(`Bienvenido ${namePlayer}`);
  askRandomCards();

  while (!finishGame) {
    showBingoCard();
    askNewTurn();
  }
}
function showBingoCard() {
  console.clear();
  console.log("Bingo Card");
  for (let i = 0; i < bingoCard.length; i++) {
    if (i % 5 === 0 && i !== 0) {
      console.log("..........................................");
    }
    console.log(bingoCard[i]);
  }
}
function askNewTurn() {
  const randomNumber = getRandomNumber(10);

  const ask = "Quieres seguir jugando? (si/no) el numero random es: ";
  let answer = prompt(ask + randomNumber);

  while (answer != "si" && answer != "no") {
    answer = prompt(ask + randomNumber);
  }
  if (answer == "si") {
    finishGame = false;
    checkNumber(randomNumber);
  } else if (answer == "no") {
    finishGame = true;
  }
}
function getRandomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}
function checkNumber(randomNumber) {
  let counter = 0;
  const linesOfOneCard = 5;
  const totalLines = bingoCard.length - 1;
  let counterTotalLines = 0;

  for (let i = 0; i < bingoCard.length; i++) {
    checkLines(i, counter, counterTotalLines, linesOfOneCard, totalLines);

    //Comprobar si el numero random coincide
    if (bingoCard[i].number === randomNumber) {
      bingoCard[i].matched = true;
      bingoCard[i].number = "X";
    }
  }
}

function checkLines(i, counter, counterTotalLines, linesOfOneCard, totalLines) {
  if (bingoCard[i].matched == true) {
    counter++;
    counterTotalLines++;
    //Comprobar si una linea esta completa
    if (counter === linesOfOneCard) {
      alert("Linea completa");
    }

    //Comprobar si he ganado
    if (counterTotalLines === totalLines) {
      alert("Bingo");
      finishGame = true;
    }
  } else {
    counter = 0;
  }
}

function askRandomCards() {
  console.clear();
  setRandomNumbers();
  showBingoCard();
  let answer = prompt("Quieres el carton que se ha generado? (si/no)");

  while (answer != "si" && answer != "no") {
    answer = prompt("Quieres el carton que se ha generado? (si/no)");
  }

  if (answer == "no") {
    askRandomCards();
  }
}
function setRandomNumbers() {
  bingoCard.forEach((card) => {
    card.number = getRandomNumber(20);
    card.matched = false;
  });
}
bingo();
