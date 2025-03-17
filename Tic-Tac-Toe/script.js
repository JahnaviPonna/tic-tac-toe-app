const board = document.getElementById("board");
const status = document.getElementById("status");
const resetButton = document.getElementById("reset");
const winnerPopup = document.getElementById("winnerPopup");
const winnerMessage = document.getElementById("winnerMessage");
const restartButton = document.getElementById("restart");
let currentPlayer = "X";
let cells = Array(9).fill(null);

function createBoard() {
    board.innerHTML = "";
    cells = Array(9).fill(null);
    status.textContent = "";
    winnerPopup.style.display = "none";
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
    }
}

function handleClick(event) {
    const index = event.target.dataset.index;
    if (cells[index] || checkWinner() || checkDraw()) return;
    cells[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    if (checkWinner()) {
        showPopup(`${currentPlayer} Wins!`);
        return;
    }
    if (checkDraw()) {
        showPopup("It's a Draw!");
        return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
    });
}

function checkDraw() {
    return cells.every(cell => cell !== null) && !checkWinner();
}

function showPopup(message) {
    winnerMessage.textContent = message;
    winnerPopup.style.display = "flex";
}

resetButton.addEventListener("click", createBoard);
restartButton.addEventListener("click", createBoard);
createBoard();