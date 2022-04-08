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
  "🦄",
  "❤️",
  "🍀",
  "🌸",
  "🌛",
  "🌍",
  "🌈",
  "🌞",
  "💥",
  "☃️",
  "😃",
  "🥳",
  "🥶",
  "😈",
  "👻",
  "👀",
  "🧜🏻‍♀️",
  "🤦🏼‍♀️",
  "🤷🏼‍♀️",
  "☂️",
  "🍓",
  "🥕",
  "🍩",
  "🥂",
];

let playable = true;


const turnCards = (isTurnOut) => {
  cardsTurned.forEach((card) => {
    card.classList.remove("card-turned");
    if(isTurnOut){
      card.classList.add("card-out");
    }
  });
  cardsTurned = [];
  playable = true;
  if(isTurnOut){
    gameOver();
  }
};

const handleMove = (event) => {
  console.log(event.target, event.currentTarget);
  if (
    playable &&
    !event.target.classList.contains("card-turned") &&
    !event.target.classList.contains("card-out") &&
    event.target.classList.contains("card")
  ) {
    cardsTurned.push(event.target);
    event.target.classList.add("card-turned");
    if (cardsTurned.length === 2) {
      playable = false;
      if (cardsTurned[0].innerHTML === cardsTurned[1].innerHTML) {
        setTimeout(turnCards, 500, true);
      } else {
        setTimeout(turnCards, 500);
      }
    }
  }
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

const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const generatePlayground = (size) => {
  cardsCount = size * size;
  // clear the playground
  message.classList.add("message-hidden");
  playground.innerHTML = "";

  let emojiToPutOnCards = shuffleArray([...emoji.slice(0, cardsCount/2), ...emoji.slice(0, cardsCount/2)]);

  emojiToPutOnCards.forEach((emoji) => {
    let div = document.createElement("div");
    playground.appendChild(div).classList.add("card");
    div.innerHTML = emoji;
  });
  playground.addEventListener("click", handleMove);
};

const startGame = (event) => {
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
  generatePlayground(playgroundSideCount);
};

const generateGameVariantButtons = () => {
  for (const variant in gameVariants) {
    // Create a new, plain <button> element
    let gameVariantButton = document.createElement("button");
    gameVariantButton.innerHTML = gameVariants[variant].buttonText;
    gameVariantButton.classList.add("reset-button");
    gameVariantButton.dataset.gameVariant = variant;
    gameVariantButton.addEventListener("click", startGame);
    // Get the parent element and insert the button element
    document.getElementById("buttons-container").appendChild(gameVariantButton);
  }
};

generateGameVariantButtons();
startGame();
