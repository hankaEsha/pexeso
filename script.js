console.clear();

const gameVariants = {
  small: {
    className: "container-small",
    playgroundSideCount: 2,
    subtitle: "Hrajete hru pro malé nebo začínající hráče",
  },
  medium: {
    className: "container-medium",
    playgroundSideCount: 4,
    subtitle: "Hrajete hru pro odvážnější hráče",
  },
  large: {
    className: "container-large",
    playgroundSideCount: 8,
    subtitle: "Hrajete hru pro pexeso profíky",
  },
};

let gameVariant = "large";

const playgroundSideCount = gameVariants[gameVariant].playgroundSideCount;

document
  .getElementById("playground")
  .classList.add(gameVariants[gameVariant].className);

document.getElementById("subtitle").innerHTML =
  gameVariants[gameVariant].subtitle;


// Create a new, plain <button> element
let playAgainButton = document.createElement("button");
// Get the reference child element
let winMessage = document.getElementById("message");

// Get the parent element and insert the playAgainButton before the winMessage node
winMessage.parentNode.insertBefore(playAgainButton, winMessage);
playAgainButton.classList.add("play-reset");
playAgainButton.innerHTML = "Nová hra";

let cardsTurned = [];

const game = (event) => {
  if (
    !event.target.classList.contains("card-turned") &&
    !event.target.classList.contains("card-out")
  ) {
    cardsTurned.push(event.target);
    event.target.classList.add("card-turned");
    console.log("if/cardTurned", event.target.classList);
    if (cardsTurned.length === 2) {
      if (cardsTurned[0].innerHTML === cardsTurned[1].innerHTML) {
        console.log("stalo se");
        for (let i = 0; i < cardsTurned.length; i++) {
          cardsTurned[i].classList.remove("card-turned");
          cardsTurned[i].classList.add("card-out");
          console.log("cyklus pro zmenu na card-out", event.target.classList);
        }
        cardsTurned = [];
      } else {
        setTimeout(turnCardsBack, 1000);
      }
    }
  }
  gameOver();
};

const generatePlayground = (size) => {
  document.getElementById("message").classList.add("message-hidden");
  document.getElementById("playground").innerHTML = "";
  let numbersList = [];
  for (let i = 0; i < size; i++) {
    numbersList.push(0);
  }
  for (let i = 0; i < 2 * size; i++) {
    let div = document.createElement("div");
    document
      .getElementById("playground")
      .appendChild(div)
      .classList.add("card");
  }
  console.log(numbersList);

  let cards = document.querySelectorAll(".card");
  for (let card of cards) {
    let number = Math.floor(Math.random() * size);
    while (numbersList[number] === 2) {
      number = Math.floor(Math.random() * size);
    }
    numbersList[number]++;
    card.innerHTML = number + 1;
  }
  console.log(numbersList);

  for (let card of cards) {
    console.log("hlavni cyklus", card.classList);
    card.addEventListener("click", game);
  }
};

const play = () => {
  generatePlayground((playgroundSideCount * playgroundSideCount) / 2);
};

play();

playAgainButton.addEventListener("click", play);

const turnCardsBack = () => {
  console.log("obratit karty", cardsTurned);
  cardsTurned.forEach((card) => {
    card.classList.remove("card-turned");
  });
  cardsTurned = [];
};

const gameOver = () => {
  if (
    document.querySelectorAll(".card-out").length ===
    playgroundSideCount * playgroundSideCount
  ) {
    document.getElementById("message").classList.remove("message-hidden");
    console.log("Výhra!");
  }
};
