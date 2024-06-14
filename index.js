
// player object
function player(name) {
    const sayName = () => { console.log(name) };
    return { name, sayName }
}

// gameboard module (IIFE) 
const GameBoard = (function () {
    let emptyBoard = [['', '', ''], ['', '', ''], ['', '', '']];
    const newGame = () => emptyBoard;
    return { newGame }
})()

function GameFlow(player0, player1) {

    // start new game
    let newGame = GameBoard.newGame();

    // place inputted players into an array
    const players = [player0, player1]

    // set an active player
    let activePlayer = players[0];

    // func to switch player
    const switchPlayerTurn = () => { activePlayer = activePlayer === players[0] ? players[1] : players[0]; };
    const getActivePlayer = () => activePlayer;


    // play the round
    const playRound = () => {
        const row = prompt('row')
        const col = prompt('col')
        if (newGame[row][col] != '') {
            console.log(`space already taken, try again ${activePlayer.name}`)
            return playRound()
        } else {
            newGame[row][col] = activePlayer.name;
        }
        console.log(`${activePlayer.name} has placed row ${row} and column ${col}`)

        // Usage in your existing logic
        if (checkWinner(newGame, activePlayer.name)) {
            console.log(`${activePlayer.name} Wins!!!`);
            return;
        }

        switchPlayerTurn(); // run switch after title placement has happened Gameboard object

        // prints whos turn it is
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


    // initial start
    playRound()
}
