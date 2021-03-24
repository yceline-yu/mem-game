"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);

let firstCard, secondCard;
let hasFlippedCard = false;
let locked = false;

/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    // missing code here ...
    let colCard = document.createElement("div");
    colCard.className = color;
    let img = document.createElement("img");
    let fimg = document.createElement("img");
    fimg.setAttribute("src", color + ".png");
    fimg.setAttribute("class", "front");
    img.setAttribute("src", "back.png");
    img.setAttribute("class", "back");
    colCard.appendChild(fimg);
    colCard.appendChild(img);
    colCard.addEventListener("click",handleCardClick);
    gameBoard.appendChild(colCard);
  }
}

/** Flip a card face-up. */

function flipCard() {
  // ... you need to write this ...
  if (firstCard.className === secondCard.className && firstCard !== secondCard){
    firstCard.removeEventListener("click",handleCardClick);
    secondCard.removeEventListener("click",handleCardClick)
  } else {
    unFlipCard(firstCard);
    unFlipCard(secondCard);
  }
}

/** Flip a card face-down. */

function unFlipCard(card) {
  // ... you need to write this ...
  locked = true;
  setTimeout(function(){
    card.classList.remove("fliped");
    locked = false;
  },FOUND_MATCH_WAIT_MSECS);
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  // ... you need to write this ...
  if (locked) return;
  this.classList.add("fliped");
  if (!hasFlippedCard){
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  hasFlippedCard = false;

  flipCard();
  winner();
}

let but = document.getElementById("reset");
but.addEventListener("click", refresh)

function refresh(){
  setTimeout(function(){
    location.reload()
  }, 100);
}

function winner(){
  let cards = document.querySelectorAll(".fliped")
  if (cards.length === 10){
    document.getElementById("winner").style.visibility = "visible";
  }
}