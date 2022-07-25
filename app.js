/*
 * Keep track of:
  - Cards Flipped
  - Matched cards
  - Win Condition

 * Shuffle and hide cards randomly
  - Shuffled when page loads
  - Reshuffle on reset
  - Make all cards face down

 * When A card is clicked
  - Make sure the card is not already flipped
  - Register only the first click
    - Do not allow the user to click multiple cards at once
  - Reveal the Card
    - Add 1 point to score
      - Do not add a point if the card was already flipped 
    - If the card matches
      - Remain flipped
      - Change it to a 'matched' state that changes the color
    - If the card doesn't match
      - Have a delay after showing the cards
      - use setTimeout() to delay card from disappearing too quickly
      - Reset the card facedown
      
  * Display the current number of moves.
    - A move is considered to have occurred when a card has been shown to the user

 * Once all cards have successfully been *matched* the user wins.
  - Indicate that they have won the game
  - Show how many moves it took them

*/

let cardIcons = [
  'fa-apple-alt',
  'fa-anchor',
  'fa-atom',
  'fa-bell',
  'fa-bolt',
  'fa-bomb',
  'fa-brain',
  'fa-cogs',
  'fa-fan',
  'fa-feather-alt',
  'fa-frog',
  'fa-hat-wizard', 
];

let nextCardQueue = [];

let gameState = {
  cardsFlipped: 0,
  cardsMatched: 0,
  cardsRemaining: 12,
}

const nextCard = document.getElementById('next-card');
const card = document.querySelectorAll('.card');
const cardFace = document.getElementsByClassName('fas');

// The grid of cards
const allCards = document.getElementById('cards').addEventListener('click', function(e) {
  // Will only work on cards without matched or show in class list
  if (e.target.className === 'card') {
    e.target.classList.add('show');
    setTimeout(() => { e.target.classList.remove('show'); }, 300);

    //Reveals Cards
    if (e.target.childNodes[1].className === nextCard.childNodes[0].className) {
      setTimeout(() => { e.target.classList.add('matched'); }, 300);
      gameState.cardsMatched++;
      queueNextCard();
      checkWin();
    }

    gameState.cardsFlipped++;
    updateScoreUI();
  } 
});

// Resets board and restarts game
const restart = document.querySelector('.restart').addEventListener('click', function() {
  gameState = {
    cardsFlipped: 0,
    cardsMatched: 0,
    cardsRemaining: 12,
  }
  
  createBoard();
  queueNextCard();
  updateScoreUI();
});

// Shuffle function from http://stackoverflow.com/a/2450976
let shuffle = function(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function createBoard() {
  // Shuffle Cards
  shuffle(cardIcons);
  
  // Replaces images
  for (let i = 0; i < card.length; i++) {
    card[i].classList = 'card'; 
    card[i].childNodes[1].classList = 'fas'; 
    card[i].childNodes[1].classList.add(cardIcons[i]);
  }

  // Clones card icons to be used for 'nextCard'
  for (let i = 0; i < cardIcons.length; i++) {
    nextCardQueue[i] = cardIcons[i]
  }
  // Shuffles order so it doesn't match board
  shuffle(nextCardQueue)

  updateScoreUI();
}

function updateScoreUI() {
  const score = document.getElementById('score');
  score.textContent = gameState.cardsFlipped;
}

function checkWin() {
  if (gameState.cardsMatched === gameState.cardsRemaining) {
    alert(`You Win and it only took you ${gameState.cardsFlipped} tries!`)
  }
}

function queueNextCard(){
  nextCard.childNodes[0].className = `fas ${nextCardQueue[gameState.cardsMatched]}`;
}

shuffle(cardIcons);
createBoard();
queueNextCard();
