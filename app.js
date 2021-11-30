/* object for holding the state of the game at any time
   playerMarks isn't currently used. originally intended
   to allow for players to choose between different mark
   styles for some customization. */
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
const gameMessage = document.getElementById("gameMessage")

function generateRandomNumber() {
    return Math.floor(Math.random() * 100) % 9
}

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
    let winner = ""
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
                winner = checkEndOfGame()
                computerTurnLogic()
                updateBoardState()
                if (!gameState.gameWon && !gameState.gameTied) {
                    winner = checkEndOfGame()
                }
                // switch whose turn it is
                if (gameState.playerTurn == "X") {
                    gameState.playerTurn = "O"
                } else {
                    gameState.playerTurn = "X"
                }
                if (winner == gameState.playerNames[0]) {
                    gameState.playerWins[0]++
                    playerOneWinsDisplay.innerText = `Wins: ${gameState.playerWins[0]}`
                }
                else if (winner == gameState.playerNames[1]) {
                    gameState.playerWins[1]++
                    playerTwoWinsDisplay.innerText = `Wins: ${gameState.playerWins[1]}`
                }
            }
        }
    }
}

function checkEndOfGame () {
    // check to see if a win condition is in any row
    if (!gameState.gameWon){
        gameState.gameWon = checkBoardRows()
    }
    // if the game hasn't been won by rows, check to see if it is by columns
    if (!gameState.gameWon) {
        gameState.gameWon = checkBoardColumns()
    }
    /* if the game isn't won by rows or columns, see if it is by diagonals
       !!!!!CURRENTLY ONLY WORKS FOR 3X3 GRID!!!!! */
    if (!gameState.gameWon) {
        gameState.gameWon = checkBoardDiagonals()
    }
    // if the game is won, increment that player's win count and change the game message
    if (gameState.gameWon) {
        if (gameState.playerTurn == "X") {
            gameMessage.innerText = `CONGRATULATIONS ${gameState.playerNames[0]}!!! YOU WIN!!!`
            return gameState.playerNames[0]
        } else {
            if (gameState.playerNames[1] != "Computer") {
                gameMessage.innerText = `CONGRATULATIONS ${gameState.playerNames[1]}!!! YOU WIN!!!`
            } else {
                gameMessage.innerText = `Nice try ${gameState.playerNames[0]}! Unfortunately, the computer won. You'll get them next time!`
            }
            return gameState.playerNames[1]
        }
    }
    /* checks to see if the game isn't won and the board is filled.
       if it hasn't been won and the board is filled, the game is tied
       since there are no cells left to play in. */
    if (!gameState.gameWon) {
        gameState.gameTied = checkBoardIsFilled()
        if (gameState.gameTied) {
            gameMessage.innerText = "The game has ended in a tie!"
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
function checkBoardIsFilled() {
    const td = document.getElementsByTagName("td")
    for (let i = 0; i < td.length; i++) {
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
    playerOneWinsDisplay.innerText = "Wins : -"
    playerTwoWinsDisplay.innerText = "Wins : -"
    playerOneNameInput.value = ""
    playerTwoNameInput.value = ""
    gameMessage.innerText = "Good Luck!"
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

// logic for computer randomly placing a mark
function computerTurnLogic() {
    if (gameState.playerNames[1] == "Computer" && !gameState.gameWon && !gameState.gameTied) {

        // switch whose turn it is
        if (gameState.playerTurn == "X") {
            gameState.playerTurn = "O"
        } else {
            gameState.playerTurn = "X"
        }
        let computerTurnOver = false
        while (!computerTurnOver) {
            let randomNumber = generateRandomNumber()
            const td = document.getElementsByTagName("td")
            if (!td[randomNumber].innerText) {
                td[randomNumber].innerText = "O"
                computerTurnOver = true
            }
        }
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
    gameMessage.innerText = "Good Luck!"
    if (gameState.playerNames[1] == "Computer" && gameState.playerTurn == "O"){
        computerTurnLogic()
    }
})