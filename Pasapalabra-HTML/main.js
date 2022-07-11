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
  {
    letter: "d",
    answer: "diarrea",
    status: 0,
    question:
      "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida",
  },
  {
    letter: "e",
    answer: "ectoplasma",
    status: 0,
    question:
      "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación",
  },
  {
    letter: "f",
    answer: "facil",
    status: 0,
    question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad",
  },
  {
    letter: "g",
    answer: "galaxia",
    status: 0,
    question:
      "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas",
  },
  {
    letter: "h",
    answer: "harakiri",
    status: 0,
    question: "CON LA H. Suicidio ritual japonés por desentrañamiento",
  },
  {
    letter: "i",
    answer: "iglesia",
    status: 0,
    question: "CON LA I. Templo cristiano",
  },
  {
    letter: "j",
    answer: "jabali",
    status: 0,
    question:
      "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba",
  },
  {
    letter: "k",
    answer: "kamikaze",
    status: 0,
    question:
      "CON LA K. Persona que se juega la vida realizando una acción temeraria",
  },
  {
    letter: "l",
    answer: "licantropo",
    status: 0,
    question: "CON LA L. Hombre lobo",
  },
  {
    letter: "m",
    answer: "misantropo",
    status: 0,
    question:
      "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas",
  },
  {
    letter: "n",
    answer: "necedad",
    status: 0,
    question: "CON LA N. Demostración de poca inteligencia",
  },
  {
    letter: "ñ",
    answer: "señal",
    status: 0,
    question:
      "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.",
  },
  {
    letter: "o",
    answer: "orco",
    status: 0,
    question:
      "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien",
  },
  {
    letter: "p",
    answer: "protoss",
    status: 0,
    question:
      "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft",
  },
  {
    letter: "q",
    answer: "queso",
    status: 0,
    question:
      "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche",
  },
  { letter: "r", answer: "raton", status: 0, question: "CON LA R. Roedor" },
  {
    letter: "s",
    answer: "stackoverflow",
    status: 0,
    question: "CON LA S. Comunidad salvadora de todo desarrollador informático",
  },
  {
    letter: "t",
    answer: "terminator",
    status: 0,
    question:
      "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984",
  },
  {
    letter: "u",
    answer: "unamuno",
    status: 0,
    question:
      "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914",
  },
  {
    letter: "v",
    answer: "vikingos",
    status: 0,
    question:
      "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa",
  },
  {
    letter: "w",
    answer: "sandwich",
    status: 0,
    question:
      "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso",
  },
  {
    letter: "x",
    answer: "botox",
    status: 0,
    question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética",
  },
  {
    letter: "y",
    answer: "peyote",
    status: 0,
    question:
      "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos",
  },
  {
    letter: "z",
    answer: "zen",
    status: 0,
    question:
      "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional",
  },
];
const colors = {
  correct: "rgb(92, 255, 51)",
  incorrect: "rgb(255, 92, 51)",
  pasapalabra: "rgb(241, 255, 51)",
  selected: "rgba(255, 255, 255)",
};
const questionsSkipped = [];
let index = 0;
let isRoundQuestionsSkipped = false;

let counter = 200;
let isPlaying = false;
let score = 0;

const btnPlay = document.getElementById("btn-play");
const btnReplay = document.getElementById("btn-replay");
const timerText = document.getElementById("timer");
const body = document.querySelector("body");
const abecedary = document.querySelector(".abecedary").childNodes;
const inputAnswer = document.querySelector(".input-answer");
const btnConfirm = document.querySelector(".btn-confirm");
const btnPasapalabra = document.querySelector(".btn-pasapalabra");

function finishGame() {
  isPlaying = false;
  const finalScoreText = document.getElementById("final-score-text");
  finalScoreText.innerText = `Puntos conseguidos: ${score}`;
  showPanelFinishGame();
}
function updateScoreUI() {
  const scoreText = document.getElementById("score-text");
  scoreText.innerText = score;
}

function loadQuestion() {
  if (isPlaying) {
    const questionText = document.getElementById("question");
    let question = "";
    if (isRoundQuestionsSkipped) {
      question = questionsSkipped[index];
    } else {
      question = questions[index];
    }
    changeColorLetter(question.letter, "selected");
    questionText.innerText = question.question;
  }
}
function nextQuestion() {
  index++;
  console.log(questions, questionsSkipped);

  if (index >= questions.length && !isRoundQuestionsSkipped) {
    isRoundQuestionsSkipped = true;
    index = 0;
    if (questionsSkipped.length === 0) {
      finishGame();
    }
  }
  if (index >= questionsSkipped.length && isRoundQuestionsSkipped) {
    index = 0;
    finishGame();
  }
  loadQuestion();
}

function keyListener() {
  document.addEventListener("keydown", (key) => {
    const keyCode = key.code;
    if (keyCode === "Space") {
      pasapalabra();
    } else if (keyCode === "Enter") {
      checkQuestion();
    }
  });
}
function pasapalabra() {
  if (!isRoundQuestionsSkipped) {
    questionsSkipped.push(questions[index]);
    changeColorLetter(questions[index].letter, "pasapalabra");
    nextQuestion();
  }
}
function checkQuestion() {
  const value = inputAnswer.value.toLowerCase();

  let question;
  if (isRoundQuestionsSkipped) {
    question = questionsSkipped[index];
  } else {
    question = questions[index];
  }
  if (value.toLowerCase() === question.answer.toLowerCase()) {
    score++;
    updateScoreUI();
    changeColorLetter(question.letter, "correct");
  } else {
    changeColorLetter(question.letter, "incorrect");
  }
  inputAnswer.value = "";
  nextQuestion();
}
function onPlayButtonClick() {
  const panel = document.querySelector(".page-beginPlay");
  isPlaying = true;
  panel.style.display = "none";
  panel.style.overflow = "auto";
  loadQuestion();
}
function showPanelFinishGame() {
  const panel = document.querySelector(".page-finish-game");
  panel.style.display = "flex";
  panel.style.overflow = "hidden";
}

function eventsListeners() {
  //Prevent default
  document
    .querySelector(".form-group")
    .addEventListener("submit", (e) => e.preventDefault());
  btnPlay.addEventListener("click", onPlayButtonClick);
  //Button replay
  btnReplay.addEventListener("click", () => {
    document.location.reload();
  });
  //Confirm Button
  btnConfirm.addEventListener("click", checkQuestion);

  //Pasapalabra Button
  btnPasapalabra.addEventListener("click", pasapalabra);
}
function changeColorLetter(letterToFind, answer) {
  const letter = Array.from(abecedary).find(
    (el) => el.textContent.toLowerCase() === letterToFind.toLowerCase()
  );
  switch (answer.toLowerCase()) {
    case "correct":
      letter.style.backgroundColor = colors.correct;
      break;
    case "incorrect":
      letter.style.backgroundColor = colors.incorrect;
      break;
    case "pasapalabra":
      letter.style.backgroundColor = colors.pasapalabra;
      break;
    case "selected":
      letter.style.backgroundColor = colors.selected;
      break;
  }
}
function main() {
  eventsListeners();
  keyListener();

  setInterval(() => {
    if (counter > 0 && isPlaying) {
      counter--;
      timerText.innerText = counter;
    } else if (counter <= 0 && isPlaying) {
      finishGame();
    }
  }, 1000);
}
main();
