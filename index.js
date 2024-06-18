
// player object
function player(name) {
    return { name}
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
    const gameDiv = document.getElementById('gameDiv');
    const winnerDiv = document.getElementById('winner');
    winnerDiv.style.display = 'none'

    // start new game
    const newGame = GameBoard.newGameBoard();
    gameDiv.style.display = 'inline-grid';

    // place inputted players into an array
    const players = [player0, player1]

    // set an active player
    let activePlayer = players[0];
    let activeToken = 'X';

    // func to switch player
    const switchPlayerTurn = () => { activePlayer = activePlayer === players[0] ? players[1] : players[0]; };
    const getActivePlayer = () => activePlayer;

    // change token between plays
    const switchToken = () => { activeToken = activeToken === 'X' ? 'O' : 'X' };

    // handling the click and getting the position
    const boxClickHandler = function (e) {
        const row = e.target.dataset.row;
        const col = e.target.dataset.col;
        const id = e.target.dataset.id;
        if (!row || !col) return;
        return playRound(row, col, id, newGame)
    }

    // add a listener to each box, remove old one. Change Inner text
    document.querySelectorAll(".gameBox").forEach(box => {
        box.innerText = '';
        box.removeEventListener('click', boxClickHandler) // remove old event listener 
        box.addEventListener("click", boxClickHandler, { once: true }); // using once to only have one handler at a time.

    });

    // play the round
    const playRound = (row, col, id, newGame) => {
        
        // checking to if box is not empty
        if (newGame[row][col] !== '') {
            console.log(`space already taken, try again ${activePlayer.name}`)
            return;
        } else {
            newGame[row][col] = activeToken;
            const activeBox = document.getElementById(id);
            activeBox.innerText = activeToken;
        }

        // Usage in your existing logic
        if (checkWinner(newGame, activeToken)) {
            gameDiv.style.display = 'none'
            winnerDiv.innerText = `${activePlayer.name} Wins!!!`;
            winnerDiv.style.display = 'block'
            return;
        } else if (checkDraw(newGame)) {
            gameDiv.style.display = 'none'
            winnerDiv.innerText = 'Draw!';
            winnerDiv.style.display = 'block'
            return;
        }


        switchPlayerTurn(); // run switch after title placement has happened GameBoard object
        switchToken(); // switch tokens 

        // prints who's turn it is
        printNewRound()
    }

    const printNewRound = () => {
        // show who's go is it
        if (activePlayer == players[0]) {
            document.querySelector('.player0').className += ' active';
            document.querySelector('.player1').className = 'player1';
        } else {
            document.querySelector('.player1').className += ' active';
            document.querySelector('.player0').className = 'player0';
        }
    };

    // check to see who the winner is
    function checkWinner(newGame, activeToken) {
        const size = newGame.length;

        // Helper function to check if all values in an array are the same
        const allEqual = arr => arr.every(val => val === activeToken);

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

    // check for draw, using map twice with a 2D array. Also, counting if the boxes are full.
    function checkDraw(newGame) {
        let count = 0
        newGame.map((boxes) => {
            boxes.map((box) => {
                if (box != '') {
                    count++;
                } else {
                    return false;
                }
            })
        })
        if (count == 9) {
            return true;
        }
        return false;
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('start')
    const name1Input = document.querySelector('#name1Input');
    const name2Input = document.querySelector('#name2Input');
    const player0Name = document.querySelector('.player0Name');
    const player1Name = document.querySelector('.player1Name');

    startButton.addEventListener('click', function () {

        // check to see if this is not the first go
        if (name1Input.className == 'hide' && name2Input.className == 'hide') {
            const player1 = player(player0Name.innerText);
            const player2 = player(player1Name.innerText);
            GameFlow(player1, player2)
        } else {
            // hide inputs
            name1Input.className = 'hide';
            name2Input.className = 'hide';
            
            // use User input as name tag
            player0Name.innerText = name1Input.value;
            player1Name.innerText = name2Input.value;

            // Create new player object
            const player1 = player(name1Input.value);
            const player2 = player(name2Input.value);
            
            GameFlow(player1, player2)
        }

    })
});