const bingoCard = [
  { number: null, matched: false },
  { number: null, matched: false },
  { number: null, matched: false },
  { number: null, matched: false },
  { number: null, matched: false },

  { number: null, matched: false },
  { number: null, matched: false },
  { number: null, matched: false },
  { number: null, matched: false },
  { number: null, matched: false },

  { number: null, matched: false },
  { number: null, matched: false },
  { number: null, matched: false },
  { number: null, matched: false },
  { number: null, matched: false },
];

let finishGame = false;

const bingo = () => {
  const namePlayer = prompt("Como te llamas?");
  console.log(`Bienvenido ${namePlayer}`);
  askRandomCards();

  while (!finishGame) {
    showBingoCard();
    askNewTurn();
  }
};
const showBingoCard = () => {
  console.clear();
  console.log("Bingo Card");
  for (let i = 0; i < bingoCard.length; i++) {
    if (i % 5 === 0 && i !== 0) {
      console.log("..........................................");
    }
    console.log(bingoCard[i]);
  }
};
const askNewTurn = () => {
  const randomNumber = getRandomNumber(bingoCard.length);

  const ask = "Continuar turno? (confirm/no) |  el numero random es: ";
  let answer = prompt(ask + randomNumber);

  while (answer != "confirm" && answer != "no") {
    answer = prompt(ask + randomNumber);
  }
  if (answer == "confirm") {
    checkNumber(randomNumber);
  } else if (answer == "no") {
    finishGame = true;
  }
};

const checkNumber = (randomNumber) => {
  //Comprobar lineas
  let counterLine = 0;
  let indexsCardsMatched = [];

  bingoCard.forEach((card) => {
    if (finishGame) return;
    if (card.number === randomNumber) {
      card.number = "X";
    }
    if (card.number == "X" && !card.matched) {
      indexsCardsMatched.push(bingoCard.indexOf(card));
      counterLine++;
      if (counterLine >= 5) {
        indexsCardsMatched.forEach((el) => (bingoCard[el].matched = true));
        checkBingo();
        if (!finishGame) alert("Linea");
      }
    } else {
      counterLine = 0;
      indexsCardsMatched = [];
    }
  });
};
const checkBingo = () => {
  const totalLines = bingoCard.length;
  let counterTotalLines = 0;
  bingoCard.forEach((card) => {
    if (card.matched && card.number == "X") counterTotalLines++;
  });
  if (counterTotalLines >= totalLines) {
    console.clear();
    showBingoCard();
    alert("Bingo");
    finishGame = true;
  }
};

const askRandomCards = () => {
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
};
const setRandomNumbers = () => {
  const randomNumbers = generateRandomNumbers(bingoCard.length);
  for (let i = 0; i < randomNumbers.length; i++) {
    const card = bingoCard[i];
    card.number = randomNumbers[i];
  }
};
const generateRandomNumbers = (amountRandomNumbers) => {
  const randomNumbers = [];
  while (randomNumbers.length < amountRandomNumbers) {
    let randomNumber = getRandomNumber(amountRandomNumbers);
    let existNumber = false;
    randomNumbers.forEach((randNum) => {
      if (randNum === randomNumber) {
        existNumber = true;
      }
    });

    if (!existNumber) {
      randomNumbers.push(randomNumber);
    }
  }
  return randomNumbers;
};

const getRandomNumber = (max) => Math.floor(Math.random() * max) + 1;

bingo();
