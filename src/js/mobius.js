const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    // restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true; //game is now running
}

function cellClicked() {
    const cellX = this.getAttribute("cellX");
    const cellY = this.getAttribute("cellY");

    if (this.textContent !== "" || !running) {
        return; //if cell is not empty or game is not running, do nothing
    }

    updateCell(this);
}

function updateCell(cell) { //add player's marks to cells
    cell.textContent = currentPlayer; //display the mark in the cell
}

function changePlayer() { //change current player
    currentPlayer = (currentPlayer == "X") ? "O": "X"; //switch player
    statusText.textContent = `${currentPlayer}'s turn`; //update status text
}