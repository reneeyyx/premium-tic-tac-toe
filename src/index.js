const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySeelctor("#restartBtn");

const winConditions = [ 
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() { //setup before game begins
    cells.forEach(cell => cell.addEventListener("click", cellClicked()));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true; //game is now running
}

function cellClicked() { //occurence after cell is clicked
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] !== "" || !running) { 
        return; //if cell is not empty or game is not running, do nothing
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) { //add player's marks to cells
    options[index] = currentPlayer; //update the cell with current player's mark
    cell.textContent = currentPlayer; //display the mark in the cell
}

function changePlayer() { //change current player
    currentPlayer = (currentPlayer == "X") ? "O": "X"; //switch player
    statusText.textContent = `${currentPlayer}'s turn`; //update status text
}

function checkWinner() { //check if there is a winner
    let roundWOn = false;

    for (let i = 0; i < winConditions.length; i++) { //iterate over each member of the win condition array
        const condition = winConditions[i]; // the array condition is the index of winConditions array
        const cellA = options[condition[0]]; // set cellA as the frist index of the condition array, and so forth for cellB and cellC
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue; //if any of the cells in the condition is empty, continue to next iteration
        }

        if (cellA === cellB && cellB === cellC) { //if all three cells match
            roundWOn = true; //set roundWon to true
            break; //exit the loop
        }
    }
    
    if (roundWon) { // win
        statusText.textContent = `${currentPlayer} wins!`; //update status text to show winner
        running = false; //stop the game
    }
    else if(!options.includes("")) { // draw
        statusText.textContent = `Draw!`; //if no empty cells left and no winner, it's a draw
        running = false; //stop the game
    }
    else { // no winner yet, game proceeds
        changePlayer(); //if no winner and cells left, change player
    }
}

function restartGame() { //reset everything
    currentPlayer = "X"; //reset current player to X
    options = ["", "", "", "", "", "", "", "", ""]; //reset options array
    statusText.textContent = `${currentPlayer}'s turn`; //update status text
    cells.forEach(cell => cell.textContent = ""); //clear all cells
    running = true; //restart the game
}