console.clear();

const gameVariants = {
  small: {
    className: "container-small",
    playgroundSideCount: 2,
    subtitle: "Hrajete malou hru pro malé nebo začínající hráče.",
    buttonText: "Nová malá hra",
  },
  medium: {
    className: "container-medium",
    playgroundSideCount: 4,
    subtitle: "Hrajete středně náročnou hru pro odvážnější hráče.",
    buttonText: "Nová střední hra",
  },
  large: {
    className: "container-large",
    playgroundSideCount: 8,
    subtitle: "Hrajete velkou hru pro pexeso profíky.",
    buttonText: "Nová velká hra",
  },
};

let cardsTurned = [];
let gameVariant = gameVariants.medium;
const playground = document.getElementById("playground");

const game = (event) => {
  if (
    !event.target.classList.contains("card-turned") &&
    !event.target.classList.contains("card-out")
  ) {
    cardsTurned.push(event.target);
    event.target.classList.add("card-turned");
    if (cardsTurned.length === 2) {
      if (cardsTurned[0].innerHTML === cardsTurned[1].innerHTML) {
        for (let i = 0; i < cardsTurned.length; i++) {
          cardsTurned[i].classList.remove("card-turned");
          cardsTurned[i].classList.add("card-out");
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
  playground.innerHTML = "";
  let numbersList = [];
  for (let i = 0; i < size; i++) {
    numbersList.push(0);
  }
  for (let i = 0; i < 2 * size; i++) {
    let div = document.createElement("div");
    playground.appendChild(div).classList.add("card");
  }

  let cards = document.querySelectorAll(".card");
  for (let card of cards) {
    let number = Math.floor(Math.random() * size);
    while (numbersList[number] === 2) {
      number = Math.floor(Math.random() * size);
    }
    numbersList[number]++;
    card.innerHTML = number + 1;
  }

  for (let card of cards) {
    card.addEventListener("click", game);
  }
};

const play = (event) => {
  if (event) {
    gameVariant = gameVariants[event.target.dataset.gameVariant];
  }
  let playgroundSideCount = gameVariant.playgroundSideCount;
  playground.classList.remove(
    "container-small",
    "container-medium",
    "container-large"
  );
  playground.classList.add(gameVariant.className);
  document.getElementById("subtitle").innerHTML = gameVariant.subtitle;
  generatePlayground((playgroundSideCount * playgroundSideCount) / 2);
};

for (const variant in gameVariants) {
  // Create a new, plain <button> element
  let gameVariantButton = document.createElement("button");
  gameVariantButton.innerHTML = gameVariants[variant].buttonText;
  gameVariantButton.classList.add("reset-button");
  gameVariantButton.dataset.gameVariant = variant;
  gameVariantButton.addEventListener("click", play);
  // Get the parent element and insert the button element
  document.getElementById("buttons-container").appendChild(gameVariantButton);
}

play();

const turnCardsBack = () => {
  cardsTurned.forEach((card) => {
    card.classList.remove("card-turned");
  });
  cardsTurned = [];
};

const gameOver = () => {
  let playgroundSideCount = gameVariant.playgroundSideCount;
  if (
    document.querySelectorAll(".card-out").length ===
    playgroundSideCount * playgroundSideCount
  ) {
    document.getElementById("message").classList.remove("message-hidden");
  }
};
