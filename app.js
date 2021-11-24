const gameState = {
    players: ["x", "o"],
    board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
}

function resetGame () {
    gameState.players = ["x", "o"];
    gameState.board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
}

const grid = document.getElementById("gameGrid")

function makeGrid () {
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

makeGrid()