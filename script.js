// let cardsArr = [];
console.clear();

let cardCount = 0;
let cardTurned = [];

const cards = document.querySelectorAll(".card");
// let cardsOut = document.querySelectorAll(".card-out");
// console.log(cardsOut);
// for (let found of cardsOut) {
//   found.classList.remove("card-out");
// }

for (let card of cards) {
  card.classList.remove("card-turned", "card-out");
  card.onclick = (event) => {
    console.log(event.target.classList.contains("card-turned"));
    console.log(event.target.classList.contains("card-out"));
    if (!event.target.classList.contains("card-turned", "card-out")) {
      cardCount++;
      // console.log(cardCount);
      if (cardCount === 3) {
        cardCount = 1;
        // if (cardTurned[0] === cardTurned[1]) {
        //   for (let card of cardTurned) {
        //     console.log(card.classList);
        //     card.classList.remove("card-turned");
        //     card.classList.add("card-out");
        //   }
      } else {
        // event.target.classList.remove("card-turned");
        // event.target.classList.add("card-out");
        // console.log(cards.classList);
        // card-turned -> card-out
      }
      cardTurned = [];
    }
    cardTurned.push(event.target.innerHTML);
    event.target.classList.add("card-turned");
  };
}
