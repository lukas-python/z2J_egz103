const userMark = "✖️"
const computerMark = "⚫"
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const playFields = document.querySelectorAll(".btn");
// Function for user move
function userMove(){
    for(let i=0; i<playFields.length; i++) {
        playFields[i].addEventListener("click", function(){
            this.innerText = userMark;
            if(checkWin(userMark)){
                winningInfo();}
            else{
                switchMove();
                computerMove();
            }
        });
}}
// Function for computer move
function computerMove(){
    for(let i=0; i<playFields.length; i++){
        if (playFields[i].innerText.trim() === "") {
            playFields[i].innerText = computerMark;
            if(checkWin(computerMark)){
                winningInfo();}
            else{
                switchMove();
            }
            break;
        }
}}
// Function for switching between players
let currentPlayer = userMark;
function switchMove() {
    if (currentPlayer === userMark){
        currentPlayer = computerMark;
    }
    else {
        currentPlayer = userMark;
    }

}
// Initializing game
function startGame() {
    const playAgainBtn = document.getElementById("playAgain");
    playAgainBtn.classList.add("hidden");
    const infoForUser = confirm("Zaczynamy grę?");
    if (infoForUser === true) {
        alert("Świetnie. Gramy!\nGracz ze znakiem X zaczyna. Wybierz dowolne pole za pomocą myszy");
        userMove();
    }
    else{
        alert("Koniec gry");
    }
}

// Function for checking win
function checkWin(mark) {
    for (let i=0; i<winningConditions.length; i++) {
        const condition = winningConditions[i];
        const checkingFields = condition.map(function(fieldIndex) {
            return playFields[fieldIndex].innerText.trim()});
        if(checkingFields.every(function(field){
            return field===mark})){
            return true;
        }
        else if (mark === userMark && checkingFields.every(function(field){
            return field === "✖️"
        })){
            return true;
        }
    }
    return false;
}
// Info who wins
function winningInfo(){
    if (checkWin(userMark)){
        alert("Wygrałeś");
        showButton()
        hideButton();

    }
    else if (checkWin(computerMark)){
        alert("Komputer wygrał");
        showButton()
        hideButton();
    }
    gameIsOn = false;
}

// Function for appearing the play again button
function showButton(){
    const playAgainBtn = document.getElementById("playAgain");
    playAgainBtn.style.display="block";
}
// Function for disappearing play again button
function hideButton(){
    const playAgainButton = document.getElementById("playAgain");
    playAgainButton.addEventListener("click", function(){
        playAgainButton.style.display="none";
        restartGame();
    });
}
// Function for restarting game
function restartGame(){
    for (let i=0; i < playFields.length; i++){
        playFields[i].innerText = "";
        }
}

let gameIsOn = true;
startGame();
winningInfo();
