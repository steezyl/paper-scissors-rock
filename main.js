
// Document query finders 
const roundCounter = document.querySelector('.roundCounter');
const compScore = document.querySelector('.compScore');
const userScore = document.querySelector('.userScore');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
const gameResult = document.querySelector('.gameResult');
const resetButton = document.querySelector('.resetButton');

// Code below hides the empty reset button 
// Better to load the button into the DOM tree than to append for UI lol
resetButton.style.visibility = "hidden";

// Global Variables to start the game
let compWins = 0;
let userWins = 0;
let gameNumber = 1;
roundCounter.textContent = "Round " +gameNumber;
compScore.textContent = "Computer's Score: " +compWins;
userScore.textContent = "Your Score: " +userWins;

// Function to generate random choice for computer
function getComputerChoice () {
    number = Math.floor(Math.random() * 3);
    switch(number) {
        case 0:
            comp = 'paper';
            break;
        case 1: 
            comp = 'scissors';
            break;
        case 2: 
            comp = 'rock';
            break;            
    }
    return comp
}

// Function plays a round of the game and will update wins
function playRound() {
    user = String(guessField.value).toLowerCase();
    comp = getComputerChoice();
    roundCounter.textContent = "Round " +gameNumber;
    compScore.textContent = "Computer's Score: " +compWins;
    userScore.textContent = "Your Score: " +userWins;
    console.log(comp,user)
    if (comp === user) {
        roundResult = `It's a draw, you both played ${comp}`;
    }
    else if ((comp == 'rock' && user == 'scissors') || (comp == 'scissors' && user == 'paper') || (comp == 'paper' && user == 'rock')) {
        roundResult = `You lost, ${comp} beats ${user}.`;
        compScore.textContent = "Computer's Score: " + ++compWins;
    }
    else {
        roundResult = `You won! ${user} beats ${comp}.`;
        userScore.textContent = "Your Score: " + ++userWins;
    }
    
    return roundResult;
}

// Function to keep track of rounds 
let counter = 0;
function game() {
        if (counter <= 3) {
            roundResult = playRound();
            gameResult.textContent = roundResult;
            roundCounter.textContent = "Round " + ++gameNumber;
            ++counter;
        }
        else if (counter==4) {
            console.log(counter);
            roundCounter.textContent = "FINAL ROUND!";
            roundResult = playRound();
            gameResult.textContent = roundResult;
            ++counter;
        }
        else {
            if (userWins > compWins) {
                gameResult.textContent = `You won! Well done, you're smarter than a computer!`
            }
            else { 
                gameResult.textContent = `You Lost! Play again!`
            }
            roundCounter.textContent = " ";
            guessField.disabled = true;
	        guessSubmit.disabled = true;
            resetButton.style.visibility = "visible";
            resetButton.textContent = 'Start new game';
            resetButton.addEventListener('click', resetGame);
        }
    }

// Reset the game and values 
function resetGame() {
	counter = 0;
    compWins = 0;
    userWins = 0;
    gameNumber = 1;
    const resetParas = document.querySelectorAll('.resultParas p');
    for (const resetPara of resetParas) {
      resetPara.textContent = '';
    }
      resetButton.textContent = '';
	  guessField.disabled = false;
	  guessSubmit.disabled = false;
	  guessField.value = '';
	  guessField.focus();
      resetButton.style.visibility = "hidden";
      roundCounter.textContent = "Round " +gameNumber;
      compScore.textContent = "Computer's Score: " +compWins;
      userScore.textContent = "Your Score: " +userWins;


}

// Event listener 
guessSubmit.addEventListener('click', game);
