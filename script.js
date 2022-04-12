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
        if (isTurnOut) {
            card.classList.add("card-out");
        }
    });
    cardsTurned = [];
    playable = true;
    if (isTurnOut) {
        gameOver();
    }
};

const handleMove = (event) => {
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
        let winMessage = document.createElement("div");
        playground.appendChild(winMessage).classList.add("win-message");
        winMessage.innerHTML = "Výhra! 🎆";
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
    playground.innerHTML = "";
    shuffleArray(emoji);
    let emojiToPutOnCards = shuffleArray([
        ...emoji.slice(0, cardsCount / 2),
        ...emoji.slice(0, cardsCount / 2),
    ]);
    // ** used only for debug mode below **
    // let cards = [];
    emojiToPutOnCards.forEach((emoji) => {
        let card = document.createElement("div");
        playground.appendChild(card).classList.add("card");
        card.innerHTML = emoji;
        // ** used only for debug mode below **
        // cards.push(card);
    });
    // ** debug mode to left only 2 playable cards **
    // cards[0].innerHTML = "🌈";
    // cards[1].innerHTML = "🌈";
    // let cardsSlice = cards.slice(2);
    // cardsSlice.forEach((card) => {
    //     card.classList.add("card-out");
    // });
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
        document
            .getElementById("buttons-container")
            .appendChild(gameVariantButton);
    }
};

playground.addEventListener("click", handleMove);
generateGameVariantButtons();
startGame();
