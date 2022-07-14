// This is a example of array of objects... each position of array contains one object...
let flights = [
  { id: 0, to: "New York", from: "Barcelona", cost: 700, scale: false },
  { id: 1, to: "Los Angeles", from: "Madrid", cost: 1100, scale: true },
  { id: 2, to: "Paris", from: "Barcelona", cost: 210, scale: false },
  { id: 3, to: "Roma", from: "Barcelona", cost: 150, scale: false },
  { id: 4, to: "London", from: "Madrid", cost: 200, scale: false },
  { id: 5, to: "Madrid", from: "Barcelona", cost: 90, scale: false },
  { id: 6, to: "Tokyo", from: "Madrid", cost: 1500, scale: true },
  { id: 7, to: "Shangai", from: "Barcelona", cost: 800, scale: true },
  { id: 8, to: "Sydney", from: "Barcelona", cost: 150, scale: true },
  { id: 9, to: "Tel-Aviv", from: "Madrid", cost: 150, scale: false },
];

let nameOfUser = "";
let isAdmin = false;
let exit = false;
const averageCost = () => {
  let sum = 0;
  let counter = 0;
  flights.forEach((flight) => {
    sum += flight.cost;
    counter++;
  });
  console.log("------------------------------");

  console.log(
    "El coste media de los vuelos es: " + (sum / counter).toFixed(2) + "€"
  );
};
function showFlights(_flights) {
  _flights.forEach((flight) => {
    let stringToShow =
      "ID: " +
      flight.id +
      " El vuelo con origen: " +
      "de " +
      flight.from +
      " a " +
      flight.to +
      ", cuesta " +
      flight.cost +
      "€";
    if (flight.scale) {
      stringToShow += " y tiene escalas";
    } else {
      stringToShow += " y no tiene escalas";
    }

    console.log(stringToShow);
  });
}
function askName() {
  nameOfUser = prompt("Cual es tu nombre?");
  if (nameOfUser == null) {
    askName();
  }
  console.log("Hola " + nameOfUser);
  console.log("------------------------------");
}
function askAdmin() {
  adminAnswer = prompt("¿Eres administrador? (si/no)");
  if (adminAnswer == "si") {
    isAdmin = true;
    return;
  } else if (adminAnswer == "no") {
    isAdmin = false;
    return;
  } else {
    console.clear();
    console.log("Ingrese una respuesta valida");
    askAdmin();
  }
}
function createFlight() {
  if (flights.length > 15) {
    alert("Solo se pueden añadir 15 vuelos");
    return;
  }
  const { destinationFlight, sourceFlight, costFlight, scaleFlight } =
    showPricesFlights();

  //Añadir vuelo
  const newFlight = {
    id: flights.length,
    to: destinationFlight,
    from: sourceFlight,
    cost: Number(costFlight),
    scale: scaleFlight.toLowerCase() == "si" ? true : false,
  };
  flights.push(newFlight);
  alert("Vuelo añadido");
}
const showPricesFlights = () => {
  const sourceFlight = prompt("Introduce el origen del vuelo");
  const destinationFlight = prompt("Introduce el destino del vuelo");

  let costFlight = prompt("Introduce el coste del vuelo");
  while (!Number(costFlight)) {
    console.log("Introduce un numero");
    costFlight = prompt("Introduce el coste del vuelo");
  }

  let scaleFlight = prompt("Introduce si tiene escalas (si/no)");
  while (scaleFlight !== "si" && scaleFlight !== "no") {
    alert("Escribe 'si o 'no'");
    scaleFlight = prompt("Introduce si tiene escalas (si/no)");
  }
  return { sourceFlight, destinationFlight, costFlight, scaleFlight };
};
function deleteFlight() {
  console.clear();
  showFlights(flights);
  const idFlight = prompt("Introduce el id del vuelo que quieres eliminar");
  const id = Number(idFlight);
  if (Number.isInteger(id)) {
    const flightToDelele = flights.find((flight) => flight.id === id);
    if (flightToDelele != null) {
      flights = flights.filter((flight) => flight.id != flightToDelele.id);
      console.clear();
      alert("Vuelo con id " + idFlight + " eliminado");
    } else {
      alert("No existe el vuelo con id " + idFlight);
    }
  } else {
    alert("El id introducido no es valido");
    deleteFlight();
  }
}

function askerManager() {
  if (isAdmin) {
    adminQuestions();
  } else {
    const answer = prompt("¿Que quieres hacer? (comprar)(salir)");
    if (answer == "salir") {
      exit = true;
      console.clear();
      console.log("Hasta pronto " + nameOfUser);
    } else if (answer == "comprar") {
      console.clear();
      buyFlight();
    } else {
      console.clear();
      console.log("Ingrese una respuesta valida");
      askerManager();
    }
  }
}

function buyFlight() {
  showFlights(flights);
  const questionPrice =
    "Introduce un precio para separar los vuelos por precio de mayor y menor al precio introducido";
  let inputPrice = prompt(questionPrice);
  numOrder = Number.parseFloat(inputPrice);
  debugger;
  while (!Number(numOrder) || inputPrice === null) {
    inputPrice = prompt(questionPrice);
  }

  console.clear();
  let flightOrdered = [];

  console.log("Vuelos con Precio menor o igual a " + numOrder + "€");
  flightOrdered = flights.filter((flight) => flight.cost <= Number(numOrder));
  showFlights(flightOrdered);

  console.log("------------------------------");

  console.log("Vuelos con Precio mayor a " + numOrder + "€");
  flightOrdered = flights.filter((flight) => flight.cost > Number(numOrder));
  showFlights(flightOrdered);

  let flightToBuy = prompt("Introduce el id del vuelo que quieres comprar");
  while (!Number(flightToBuy)) {
    flightToBuy = prompt("Introduce el id del vuelo que quieres comprar");
  }

  //Comprobar si el vuelo existe
  const boughtFly = flights.find((flight) => flight.id == Number(flightToBuy));
  if (boughtFly != null) {
    alert(
      "Gracias por la compra del vuelo " + boughtFly.id + ", vuelva pronto."
    );
  } else {
    alert("El id introducido no es valido");
    buyFlight();
  }
}

function adminQuestions() {
  const answer = prompt("¿Que quieres hacer? (crear/eliminar/salir)");
  if (answer == "crear") {
    createFlight();
  } else if (answer == "eliminar") {
    deleteFlight();
  } else if (answer == "salir") {
    exit = true;
    console.clear();
    console.log("Hasta pronto " + nameOfUser);
  } else {
    console.clear();
    console.log("Ingrese una respuesta valida");
    askerManager();
  }
}

//Main
function main() {
  askName();
  askAdmin();
  averageCost();

  while (!exit) {
    console.clear();
    showFlights(flights);
    averageCost();
    askerManager();
  }
}
main();
