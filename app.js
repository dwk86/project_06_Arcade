const gameState = {
    players: ["x", "o"],
    board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
}

// Reset a 3x3 game grid and player names
function resetGame () {
    gameState.players = ["x", "o"];
    gameState.board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
}

const gameArea = document.getElementById("gameArea")

/*  Check if a game grid is present on the page.
    If there is no grid, create a 3x3 grid.
    If there is a grid, do nothing. */
function makeGrid () {
    let tableCheck = document.getElementsByTagName("table")[0]
    console.log(tableCheck)
    if (tableCheck) {
        console.log("I'm in the if!")
    }
    else {
        const grid = document.createElement("table")
        for (let i = 0; i < 3; i++) {
            const row = document.createElement("tr")
            for (let j = 0; j < 3; j++) {
                const column = document.createElement("td")
                row.appendChild(column)
                console.log("column made")
            }
            grid.appendChild(row)
            console.log("row made")
        }
        gameArea.appendChild(grid)
    }
}

// Executes the makeGrid function on the button click *** button text is Create Game Grid ***
const createGrid = document.getElementById("createGrid")
createGrid.addEventListener("click", makeGrid)


let currentMark = "X"
const grid = document.getElementsByTagName("table")[0]
function createMark (event) {
    const cell = event.target
    if (event.target !== grid) {
        if (cell.innerText) {
            cell.innerText = currentMark
        }
    }
    else {
        // currently intended to do nothing. could add functionality for warning to player that space is taken.
    }
}

grid.addEventListener("click", createMark)