const gameState = {
    playerMarks: ["X", "O"],
    playerNames: ["Player 1", "Player 2"],
    playerTurn: "X",
    board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
}

// create a 3x3 game grid in table id gameGrid
const gameGrid = document.getElementsByTagName("table")[0]
function createGameGrid () {
    for (let i = 0; i < 3; i++) {
        const row = document.createElement("tr")
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement("td")
            row.appendChild(cell)
        }
        gameGrid.appendChild(row)
    }
}

createGameGrid()

// creates a mark on the game grid for the player whose turn it is
function createMark (event) {
    const targetCell = event.target
    if (event.target !== gameGrid) {
        if (gameState.playerTurn == "X") {
            gameState.playerTurn = "O"
            targetCell.innerText = "X"
        }
        else {
            gameState.playerTurn = "X"
            targetCell.innerText = "O"
        }
    }
}

gameGrid.addEventListener("click", createMark)
