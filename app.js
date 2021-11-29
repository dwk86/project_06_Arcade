const gameState = {
    playerMarks: ["X", "O"],
    playerNames: ["", ""],
    playerNamesLoaded: false,
    playerWins: [0, 0],
    playerTurn: "X",
    gameOver: false,
    board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
}

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
    if (event.target !== gameGrid) {
        if (!gameState.gameOver && gameState.playerNamesLoaded) {
            if (!targetCell.innerText) {
                if (gameState.playerTurn == "X") {
                    targetCell.innerText = gameState.playerMarks[0]
                } else {
                    targetCell.innerText = gameState.playerMarks[1]
                }
                updateBoardState()
                if (gameState.playerTurn == "X") {
                    gameState.playerTurn = "O"
                } else {
                    gameState.playerTurn = "X"
                }
            }
            gameState.gameOver = checkBoardRows()
            if (!gameState.gameOver) {
                gameState.gameOver = checkBoardColumns()
            }
            if (!gameState.gameOver) {
                gameState.gameOver = checkBoardDiagonals()
            }
            if (gameState.gameOver) {
                if (gameState.playerTurn == "O") {
                    gameState.playerWins[0]++
                    playerOneWinsDisplay.innerText = `Wins: ${gameState.playerWins[0]}`

                } else {
                    gameState.playerWins[1]++
                    playerTwoWinsDisplay.innerText = `Wins: ${gameState.playerWins[1]}`
                }
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


// resets game completely
function resetGame() {
    const td = document.getElementsByTagName("td")
    gameState.playerMarks = ["X", "O"]
    gameState.playerNames = ["", ""]
    gameState.playerNamesLoaded = false
    gameState.playerWins = [0, 0]
    gameState.playerTurn = "X"
    gameState.gameOver = false
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

createGameGrid()
gameGrid.addEventListener("click", createMark)
resetButton.addEventListener("click", resetGame)
updatePlayersButton.addEventListener("click", loadPlayerNames)
isPlayerTwoComputerButton.addEventListener("click", function () {
    playerTwoNameInput.value = "Computer"
})