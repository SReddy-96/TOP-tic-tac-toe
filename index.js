
// player object
function player(name) {
    const sayName = () => { console.log(name) };
    return { name, sayName }
}

// GameBoard module (IIFE) 
const GameBoard = (function () {
    const rows = 3;
    const cols = 3;
    const emptyBoard = []; // creating an empty 2D array
    const newGameBoard = () => {
        for (let i = 0; i < rows; i++) {
            emptyBoard[i] = [];
            for (let j = 0; j < cols; j++) {
                emptyBoard[i][j] = '';
            }
        }
        return emptyBoard
    };
    return { newGameBoard }
})()

// controls the flow of the game
function GameFlow(player0, player1) {
    let gameDiv = document.getElementById('gameDiv');

    // start new game
    let newGame = GameBoard.newGameBoard();
    gameDiv.style.display = 'inline-grid';

    // place inputted players into an array
    const players = [player0, player1]

    // set an active player
    let activePlayer = players[0];

    // func to switch player
    const switchPlayerTurn = () => { activePlayer = activePlayer === players[0] ? players[1] : players[0]; };
    const getActivePlayer = () => activePlayer;

    // add a listener to each box
    document.querySelectorAll(".gameBox").forEach(box => {
        box.addEventListener("click", boxClickHandler)
    });

    // handling the click and getting the position
    function boxClickHandler(e) {
        const row = e.target.dataset.row;
        const col = e.target.dataset.col;
        if (!row || !col) return;
        playRound(row, col)
    }

    // play the round
    const playRound = (row, col) => {
        if (newGame[row][col] != '') {
            console.log(`space already taken, try again ${activePlayer.name}`)
            return;
        } else {
            newGame[row][col] = activePlayer.name;
        }
        console.log(`${activePlayer.name} has placed row ${row} and column ${col}`)

        // Usage in your existing logic
        if (checkWinner(newGame, activePlayer.name)) {
            console.log(newGame[0])
            console.log(newGame[1])
            console.log(newGame[2])
            console.log(`${activePlayer.name} Wins!!!`);
            return;
        }

        switchPlayerTurn(); // run switch after title placement has happened GameBoard object

        // prints who's turn it is
        printNewRound()

        // play again
        playRound()
    }

    const printNewRound = () => {
        // visual see board in console
        console.log(newGame[0])
        console.log(newGame[1])
        console.log(newGame[2])
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    // check to see who the winner is
    function checkWinner(newGame, playerName) {
        const size = newGame.length;

        // Helper function to check if all values in an array are the same
        const allEqual = arr => arr.every(val => val === playerName);

        // Check rows and columns
        for (let i = 0; i < size; i++) {
            // Check row
            if (allEqual(newGame[i])) return true;

            // Check column
            const col = newGame.map(row => row[i]);
            if (allEqual(col)) return true;
        }

        // Check diagonals
        const mainDiagonal = newGame.map((row, i) => row[i]);
        if (allEqual(mainDiagonal)) return true;

        const antiDiagonal = newGame.map((row, i) => row[size - 1 - i]);
        if (allEqual(antiDiagonal)) return true;

        // No winner found
        return false;
    }

    return { playRound }
}

document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('start')


    startButton.addEventListener('click', function () {
        const steve = player('steve')
        const beth = player('beth')
        GameFlow(steve, beth)
    })
});