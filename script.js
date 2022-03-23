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
let gameVariant = gameVariants.small;
const playground = document.getElementById("playground");
const message = document.getElementById("message");

const emoji = [
  "🐶",
  "🐒",
  "🦖",
  "🦞",
  "🐬",
  "🐆",
  "🐈",
  "🦮",
  "🦫",
  "😃",
  "🥳",
  "🥶",
  "😈",
  "👻",
  "👀",
  "🧜🏻‍♀️",
  "🤦🏼‍♀️",
  "🤷🏼‍♀️",
  "👩‍❤️‍👨",
  "🍀",
  "🌸",
  "🌛",
  "🌍",
  "🌈",
  "🌪",
  "☀️",
  "☃️",
  "☂️",
  "🍓",
  "🥕",
  "🍩",
  "🥂",
];


const playable = () => {
  if (parseInt(playground.dataset.playable)) {
    playground.addEventListener("click", game);
    console.log("can play");
  } else {
    console.log("can't play");
    playground.removeEventListener("click", game);
  }
};

const game = (event) => {
  // console.log("start playground.dataset.playable: ", playground.dataset.playable)
  // if (parseInt(playground.dataset.playable)){
  //   playground.addEventListener("click", game);
  //   console.log("can play");
  // } else {
  //   console.log("can't play");
  // }
  if (
    !event.target.classList.contains("card-turned") &&
    !event.target.classList.contains("card-out")
  ) {
    cardsTurned.push(event.target);
    event.target.classList.add("card-turned");
    if (cardsTurned.length === 2) {
      playground.dataset.playable = 0;
      playable();
      console.log(
        "if playground.dataset.playable: ",
        playground.dataset.playable
      );
      if (cardsTurned[0].innerHTML === cardsTurned[1].innerHTML) {
        const turnCardsOut = () => {
          for (let i = 0; i < cardsTurned.length; i++) {
            cardsTurned[i].classList.remove("card-turned");
            cardsTurned[i].classList.add("card-out");
          }
          cardsTurned = [];
        };
        setTimeout(turnCardsOut, 1000);
        console.log(
          "turnCardsOut set Timeout playground.dataset.playable: ",
          playground.dataset.playable
        );
        playground.dataset.playable = 1;
        setTimeout(playable, 1000);
        console.log(
          "turnCardsOut set Timeout playground.dataset.playable: ",
          playground.dataset.playable
        );
      } else {
        setTimeout(turnCardsBack, 1500);
        console.log(
          "turnCardsBack set Timeout playground.dataset.playable: ",
          playground.dataset.playable
        );
        playground.dataset.playable = 1;
        setTimeout(playable, 1500);
        console.log(
          "turnCardsBack set Timeout playground.dataset.playable: ",
          playground.dataset.playable
        );
      }
    }
  }
  setTimeout(gameOver, 1500);
};

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
    message.classList.remove("message-hidden");
  }
};

const generatePlayground = (size) => {
  // clear the playground
  message.classList.add("message-hidden");
  playground.innerHTML = "";
  let numbersList = [];
  // push emojis from the emoji array into the numbersList - 8x in medium version
  for (let i = 0; i < size; i++) {
    numbersList.push(0);
  }
  // create card elements 2*8 in medium version
  for (let i = 0; i < 2 * size; i++) {
    let div = document.createElement("div");
    playground.appendChild(div).classList.add("card");
  }
  // select all created cards
  let cards = document.querySelectorAll(".card");
  // cycle through all card elements
  for (let card of cards) {
    // get a random number up to 8 in medium version
    let number = Math.floor(Math.random() * size); // *2
    // generate new random number and use it as an index till the time all icons are included twice
    while (numbersList[number] === 2) {
      number = Math.floor(Math.random() * size);
    }
    numbersList[number]++;
    card.innerHTML = emoji[number];
  }
  playground.dataset.playable = 1;
  playable();
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

const generateGameVariantButton = () => {
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
};

generateGameVariantButton();
play();
