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
let isLine = false;
let namePlayer;
let turn = 0;
let score = 0;
const rangeMaxRandNums = 90;
const maxNumBombo = 90;
let indexNumBombo = 0;
let numsInBombo = [];
const rankingScore = [];
const points = {
  byTurn: 2,
  byNumber: 5,
  byLine: 10,
  byBingo: 20,
};

const bingo = () => {
  askName();
  alert(`Bienvenido ${namePlayer}`);
  showSystemPoints();
  setBomboNumbers();
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
  alert(`${namePlayer} lo has completado en ${turn} turnos`);
  alert(`Has conseguido ${score} puntos`);
  turn = 0;
  const player = {
    name: namePlayer,
    points: score,
  };
  rankingScore.push(player);
  showRankings();
  askPlayAgain();
};
const showSystemPoints = () => {
  let messg = "Sistema de puntos: ";
  messg += "\n";
  messg += `Por cada turno, se restan ${points.byTurn} puntos`;
  messg += "\n";
  messg += `Por cada numero que se acierta, se suman ${points.byNumber} puntos`;
  messg += "\n";
  messg += `Por cada linea, se suman ${points.byLine} puntos`;
  messg += "\n";
  messg += `Si haces Bingo, se suman ${points.byBingo} puntos`;
  alert(messg);
};
const askPlayAgain = () => {
  let answer = prompt("Quieres jugar de nuevo? (si/no)");

  if (answer == null || answer.toLowerCase() == "no") {
    alert("Gracias por jugar " + namePlayer);
    return;
  } else if (answer.toLowerCase() != "si" && answer.toLowerCase() != "no") {
    askPlayAgain();
  } else if (answer.toLocaleLowerCase == "si") {
    resetGame();
    bingo();
  }
};
const showRankings = () => {
  let messg = "Ranking: ";
  messg += "\n";
  rankingScore.sort((a, b) => b.points - a.points);
  rankingScore.forEach((player, index) => {
    messg += `${index + 1}. ${player.name} - ${player.points} puntos`;
    messg += "\n";
  });
  alert(messg);
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
    subScore(points.byTurn);
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
      addScore(points.byNumber);
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
            addScore(points.byBingo);
            finishGame();
          } else if (!isLine) {
            alert("Linea");
            isLine = true;
            addScore(points.byLine);
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
  bingoCard.forEach((card, index) => {
    card.number = randomNumbers[index];
    card.matched = false;
  });
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
const subScore = (value) => {
  score -= value;
  if (score <= 0) {
    score = 0;
  }
};
const addScore = (value) => {
  score += value;
};
const resetGame = () => {
  score = 0;
  turn = 0;
  isLine = false;
  isFinishGame = false;
  namePlayer = "";
};
bingo();
