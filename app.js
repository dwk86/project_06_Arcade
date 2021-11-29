// object for holding the state of the game at any time
const gameState = {
    playerMarks: ["X", "O"],
    playerNames: ["", ""],
    playerNamesLoaded: false,
    playerWins: [0, 0],
    playerTurn: "X",
    gameWon: false,
    gameTied: false,
    board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
}

/* bunch of constants for interacting with DOM
   probably could be done a bit cleaner */
const gameGrid = document.getElementById("gameGrid")
const resetButton = document.getElementById("resetButton")
const updatePlayersButton = document.getElementById("updatePlayersButton")
const isPlayerTwoComputerButton = document.getElementById("isPlayerTwoComputerButton")
const playerOneNameInput = document.getElementById("playerOneNameInput")
const playerTwoNameInput = document.getElementById("playerTwoNameInput")
const playerOneNameDisplay = document.getElementById("playerOneNameDisplay")
const playerTwoNameDisplay = document.getElementById("playerTwoNameDisplay")
const playerOneWinsDisplay = document.getElementById("playerOneWinsDisplay")
const playerTwoWinsDisplay = document.getElementById("playerTwoWinsDisplay")
const playAgainButton = document.getElementById("playAgainButton")

// create a 3x3 game grid in table id gameGrid
function createGameGrid() {
    for (let i = 0; i < 3; i++) {
        const row = document.createElement("tr")
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement("td")
            row.appendChild(cell)
        }
        gameGrid.appendChild(row)
    }
}

// creates a mark on the game grid for the player whose turn it is
function createMark(event) {
    const targetCell = event.target
    // if the target of the click event is not a cell, skip the game logic
    if (event.target !== gameGrid) {
        // if the game isn't won or tied and the player names have been loaded, go through the game logic
        if (!gameState.gameWon && !gameState.gameTied && gameState.playerNamesLoaded) {
            // if the target cell of the click is empty, place a mark
            if (!targetCell.innerText) {
                // mark the cell according to the player whose turn it is
                if (gameState.playerTurn == "X") {
                    targetCell.innerText = gameState.playerMarks[0]
                } else {
                    targetCell.innerText = gameState.playerMarks[1]
                }
                updateBoardState()
                // switch whose turn it is
                if (gameState.playerTurn == "X") {
                    gameState.playerTurn = "O"
                } else {
                    gameState.playerTurn = "X"
                }
            }
            // check to see if a win condition is in any row
            gameState.gameWon = checkBoardRows()
            // if the game hasn't been won by rows, check to see if it is by columns
            if (!gameState.gameWon) {
                gameState.gameWon = checkBoardColumns()
            }
            /* if the game isn't won by rows or columns, see if it is by diagonals
               !!!!!CURRENTLY ONLY WORKS FOR 3X3 GRID!!!!! */
            if (!gameState.gameWon) {
                gameState.gameWon = checkBoardDiagonals()
            }
            /* if the game is won, increment that player's win count
               I KNOW THE LOGIC HERE IS WONKY. I HAVE THE PLAYER'S TURN SWITCHING TOO EARLY.
               I INTEND TO FIX THIS IF I CAN COME BACK TO IT IN TIME. IF NOT, THIS MAKES IT WORK FOR NOW. */
            if (gameState.gameWon) {
                if (gameState.playerTurn == "O") {
                    gameState.playerWins[0]++
                    playerOneWinsDisplay.innerText = `Wins: ${gameState.playerWins[0]}`

                } else {
                    gameState.playerWins[1]++
                    playerTwoWinsDisplay.innerText = `Wins: ${gameState.playerWins[1]}`
                }
            }
            /* checks to see if the game isn't won and the board is filled.
               if it hasn't been won and the board is filled, the game is tied
               since there are no cells left to play in. */
            if (!gameState.gameWon) {
                gameState.gameTied = checkBoardIsFilled()
                console.log(gameState.gameTied)
            }
        }
    }
}

// update gameState with the current board values
function updateBoardState() {
    const numberOfRows = document.getElementsByTagName("tr").length
    const numberOfColumns = document.getElementsByTagName("td").length / numberOfRows
    const td = document.getElementsByTagName("td")
    let k = 0
    for (let i = 0; i < numberOfRows; i++) {
        for (let j = 0; j < numberOfColumns; j++) {
            gameState.board[i][j] = td[k].innerText
            k++
        }
    }
}

// checks each row to see if the win condition is met
function checkBoardRows() {
    for (let i = 0; i < gameState.board.length; i++) {
        if (gameState.board[i][0] && gameState.board[i][1] && gameState.board[i][2] && gameState.board[i][0] == gameState.board[i][1] && gameState.board[i][0] == gameState.board[i][2]) {
            return true
        }
    }
    return false
}

// checks the diagonals to see if the win condition is met
function checkBoardDiagonals() {
    if (gameState.board[0][0] && gameState.board[1][1] && gameState.board[2][2] && gameState.board[0][0] == gameState.board[1][1] && gameState.board[0][0] == gameState.board[2][2]) {
        return true
    } else if (gameState.board[2][0] && gameState.board[1][1] && gameState.board[0][2] && gameState.board[2][0] == gameState.board[1][1] && gameState.board[2][0] == gameState.board[0][2]) {
        return true
    } else {
        return false
    }
}

// checks each column to see if the win condition is met
function checkBoardColumns() {
    for (let i = 0; i < gameState.board[0].length; i++) {
        if (gameState.board[0][i] && gameState.board[1][i] && gameState.board[2][i] && gameState.board[0][i] == gameState.board[1][i] && gameState.board[0][i] == gameState.board[2][i]) {
            return true
        }
    }
    return false
}

// checks if grid is completely filled
function checkBoardIsFilled () {
    const td = document.getElementsByTagName("td")
    for  (let i = 0; i < td.length; i++) {
        if (!td[i].innerText) {
            return false
        }
    }
    return true
}

// resets game completely
function resetGame() {
    const td = document.getElementsByTagName("td")
    gameState.playerMarks = ["X", "O"]
    gameState.playerNames = ["", ""]
    gameState.playerNamesLoaded = false
    gameState.playerWins = [0, 0]
    gameState.playerTurn = "X"
    gameState.gameWon = false
    gameState.gameTied = false
    gameState.board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
    for (let i = 0; i < td.length; i++) {
        td[i].innerText = ""
    }
    playerOneNameDisplay.innerText = "Player 1 Name:"
    playerTwoNameDisplay.innerText = "Player 2 Name:"
    playerOneWinsDisplay.innerText = "Wins : 0"
    playerTwoWinsDisplay.innerText = "Wins : 0"
    playerOneNameInput.value = ""
    playerTwoNameInput.value = ""
}

// load player names into gameState and into HTML
function loadPlayerNames() {
    if (playerOneNameInput.value && playerTwoNameInput.value && !gameState.playerNamesLoaded) {
        playerOneNameDisplay.innerText = `Player 1 Name: ${playerOneNameInput.value}`
        playerTwoNameDisplay.innerText = `Player 2 Name: ${playerTwoNameInput.value}`
        gameState.playerNames[0] = playerOneNameInput.value
        gameState.playerNames[1] = playerTwoNameInput.value
        playerOneNameInput.value = ""
        playerTwoNameInput.value = ""
        gameState.playerNamesLoaded = true
    }
}

// creates 3x3 grid. intended to be replaced with ability to create custom grids
createGameGrid()
/* logic for placing mark on the game board. also houses logic for win condition
   and switching the player whose turn it is */
gameGrid.addEventListener("click", createMark)
// completely resets the game state to as if the page was reloaded for new players
resetButton.addEventListener("click", resetGame)
// places player names into the game board from the menu
updatePlayersButton.addEventListener("click", loadPlayerNames)
// just places Computer as the name for player 2
isPlayerTwoComputerButton.addEventListener("click", function () {
    playerTwoNameInput.value = "Computer"
})
/* resets the game for playing again. is different than the reset game button
   because it doesn't reset player names, wins, or symbols */
playAgainButton.addEventListener("click", function () {
    const td = document.getElementsByTagName("td")
    if (gameState.playerTurn = "X") {
        gameState.playerTurn = "O"
    }
    else {
        gameState.playerTurn = "X"
    }
    gameState.gameWon = false
    gameState.gameTied = false
    gameState.board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
    for (let i = 0; i < td.length; i++) {
        td[i].innerText = ""
    }
    playerOneNameInput.value = ""
    playerTwoNameInput.value = ""
})