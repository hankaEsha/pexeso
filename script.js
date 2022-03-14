console.clear();

const playgroundSideCount = 4;
let cardsTurned = [];

const play = (size) => {
  document.getElementById("playground").innerHTML = "";
  let numbersList = [];
  for (let i = 0; i < size; i++) {
    numbersList.push(0);
  }
  for (let i = 0; i < 2*size; i++) {
    let div = document.createElement("div");
    document.getElementById("playground").appendChild(div).classList.add("card");
  }
  console.log(numbersList);

  let cards = document.querySelectorAll(".card");
  for (let card of cards) {
    let number = Math.floor(Math.random()*size);
    while (numbersList[number] === 2){
      number = Math.floor(Math.random()*size);
    }
    numbersList[number]++;
    card.innerHTML = number +1;
  }
  console.log(numbersList);
  return cards
};

let cards = play(2*playgroundSideCount);

const turnCardsBack = () => {
  console.log("obratit karty", cardsTurned);
  cardsTurned.forEach((card) => {
    card.classList.remove("card-turned");
  })
  cardsTurned = [];
};

const gameOver = () => {
  if (document.querySelectorAll(".card-out").length === playgroundSideCount*playgroundSideCount) {
    document.getElementById("message").style.display = "block";
    console.log("You won!");
  }
};

const game = (event) => {
  // console.log(event.target.classList.contains("card-turned"));
  // console.log(event.target.classList.contains("card-out"));
  if (!event.target.classList.contains("card-turned") && !event.target.classList.contains("card-out")) {
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

for (let card of cards) {
    console.log("hlavni cyklus", card.classList);
    card.addEventListener("click", game)
  }
