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

const grid = document.getElementsByTagName("table")[0]

/*  Check if a game grid is present on the page.
    If there is no grid, create a 3x3 grid.
    If there is a grid, do nothing. */
function makeGrid () {
    let tableCheck = document.getElementsByTagName("tr")[0]
    console.log(tableCheck)
    if (tableCheck) {
        console.log("I'm in the if!")
    }
    else {
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
    }
}

// Executes the makeGrid function on the Create Game Grid button click
const createGrid = document.getElementById("createGrid")
createGrid.addEventListener("click", makeGrid)


const currentMark = "X"
function createMark (event) {
    console.log("createMark called")
    const cell = event.target
    if (event.target !== grid) {
        console.log("target is not the table")
        if (!cell.innerText) {
            console.log("trying to place mark in cell")
            cell.innerText = currentMark
        }
        else {
            console.log("there is already a mark there!")
        }
    }
    else {
        console.log("the target is the grid!")
    }
}

grid.addEventListener("click", createMark)