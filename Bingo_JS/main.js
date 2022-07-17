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

let isFinishGame = false;
let namePlayer;
let turn = 0;
const rangeMaxRandNums = 90;
const maxNumBombo = 90;
let indexNumBombo = 0;
let numsInBombo = [];

const bingo = () => {
  askName();
  setBomboNumbers();
  alert(`Bienvenido ${namePlayer}`);
  askRandomCards();

  while (!isFinishGame) {
    showBingoCard();
    askNewTurn();
  }
};
const askName = () => {
  namePlayer = prompt("Como te llamas?");
  if (namePlayer === "") askName();
};
const finishGame = () => {
  showBingoCard();
  isFinishGame = true;
  alert(`${namePlayer}lo has completado en ${turn} turnos`);
  turn = 0;
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
  const randomNumber = getBomboNumber();
  showBingoCard();
  const ask = "Continuar turno? | El numero random es: ";
  let answer = confirm(ask + randomNumber);

  if (answer) {
    checkNumber(randomNumber);
    showBingoCard();
    turn++;
  } else {
    isFinishGame = true;
  }
};

const checkNumber = (randomNumber) => {
  //Comprobar lineas
  let counter = 0;
  let indexCards = [];
  let counterMatches = 0;
  for (let i = 0; i < bingoCard.length; i++) {
    const currentCard = bingoCard[i];

    if (currentCard.number === randomNumber) {
      currentCard.number = "X";
    }
    if (counter >= 5) {
      counter = 0;
      counterMatches = 0;
      indexCards = [];
    }

    //Contador para ir de linea en linea
    if (counter < 5) {
      if (currentCard.number == "X" && !currentCard.matched) {
        counterMatches++;
        indexCards.push(i);

        if (counterMatches === 5) {
          indexCards.forEach((index) => (bingoCard[index].matched = true));

          if (checkBingo()) {
            alert("Bingo");
            finishGame();
          } else {
            alert("Linea");
          }

          counterMatches = 0;
          indexCards = [];
        }
      }
    }
    counter++;
  }
};

const checkBingo = () => {
  let isBingo = false;
  const cardNotMatched = bingoCard.find((card) => card.matched == false);
  if (cardNotMatched === undefined) {
    isBingo = true;
  }
  return isBingo;
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
  const randomNumbers = generateRandomNumbers(90);
  for (let i = 0; i < bingoCard.length; i++) {
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

const setBomboNumbers = () => {
  numsInBombo = generateRandomNumbers(maxNumBombo);
};
const getBomboNumber = () => {
  let randNum = numsInBombo[indexNumBombo];
  indexNumBombo++;
  if (numsInBombo.length <= indexNumBombo) {
    indexNumBombo = 0;
  }
  return randNum;
};

bingo();
