const questions = [
  {
    letter: "a",
    answer: "abducir",
    status: 0,
    question:
      "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien",
  },
  {
    letter: "b",
    answer: "bingo",
    status: 0,
    question:
      "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso",
  },
  {
    letter: "c",
    answer: "churumbel",
    status: 0,
    question: "CON LA C. Niño, crío, bebé",
  },
];
const questionsNotAnswered = [];
const correctQuestions = [];
const wrongQuestions = [];
let points = 0;
let isFinishGame = false;
function main() {
  //Ask questions
  for (let i = 0; i < questions.length; i++) {
    const answer = prompt(questions[i].question);
    if (answer.toLowerCase() === questions[i].question.toLowerCase()) {
      alert("Correct, you have 1 point");
      correctQuestions.push(questions[i]);
      points++;
    } else if (answer.toLowerCase() === "pasapalabra") {
      questionsNotAnswered.push(question);
    } else if (answer.toUpperCase() === "END") {
      endGame();
      break;
    } else {
      wrongQuestions.push(questions[i]);
    }
  }
  if (isFinishGame) {
    return;
  }
  if (questionsNotAnswered.length > 0) alert("Second Round");

  //ask questions not answered
  for (let i = 0; i < questionsNotAnswered.length; i++) {
    const answer = prompt(questionsNotAnswered[i].question);
    if (answer.toLowerCase() === questionsNotAnswered[i].toLowerCase()) {
      alert("Correct, you have 1 point");
      points++;
    } else if (answer.toUpperCase() === "END") {
      endGame();
      break;
    } else {
      wrongQuestions.push(questions[i]);
    }
  }
}
function endGame() {
  alert("The game have finished you have " + points + " points");
}
main();
