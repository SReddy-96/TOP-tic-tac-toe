
// player object
const player = (name) => {
    return { name }
}

// gameboard object / module 
const GameBoard = () => {
    let emptyBoard = [['', '', ''], ['', '', ''], ['', '', '']];
    return { emptyBoard }
}

console.log(GameBoard.emptyBoard)