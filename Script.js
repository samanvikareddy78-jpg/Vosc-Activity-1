const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;

let board = ["", "", "", "", "", "", "", ""];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach((cell, index) => {

    cell.addEventListener("click", () => {

        if (board[index] !== "" || !gameActive) {
            return;
        }

        board[index] = currentPlayer;

        cell.textContent = currentPlayer;

        cell.classList.add(
            currentPlayer.toLowerCase()
        );

        checkWinner();
    });

});


function checkWinner() {

    for (let combination of winningCombinations) {

        const a = combination[0];
        const b = combination[1];
        const c = combination[2];

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {

            statusText.textContent =
                `Player ${currentPlayer} Wins!`;

            gameActive = false;

            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");

            return;
        }
    }

    if (!board.includes("")) {

        statusText.textContent = "It's a Draw!";

        gameActive = false;

        return;
    }

    currentPlayer =
        currentPlayer === "X" ? "O" : "X";

    statusText.textContent =
        `Player ${currentPlayer}'s Turn`;
}


restartButton.addEventListener(
    "click",
    restartGame
);


function restartGame() {

    currentPlayer = "X";

    gameActive = true;

    board = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];

    cells.forEach(cell => {

        cell.textContent = "";

        cell.classList.remove(
            "x",
            "o",
            "winner"
        );

    });

    statusText.textContent =
        "Player X's Turn";
}
