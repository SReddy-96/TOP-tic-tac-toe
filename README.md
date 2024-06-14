# The Odin Project - Tic-Tac-Toe

## Objective

## model 
### index
![Dashboard screenshot](images/TOP-library.png)


## Problems encountered

## New skills


## languages
- HTML
- CSS
- JavaScript

sudo:

- [x] the game board is an array so this is a 2d array gameboard[['','',''],['','',''],['','','']]. may be stored in a IIFE to make the board
- [x] which is then stored inside a GameBoard object
- [x] one object to store the player.
- [x] one object to control the flow of the game
- [ ] Using factories as much as possible and nesting everything inside
- [ ] find a way to start a fresh board when there is a winner.
- [x] Refactoring the winner checker using `.map()` and mapping over the arrays instead of using `&&`
- [ ] create object for displaying the board 
- [ ] render the board onto the DOM
- [ ] handle clicking on the DOM space to add the users input
- [ ] handle player not selecting an already taken spot
- [ ] user able to add name
- [ ] start and restart button 
- [ ] handle when i player wins and show this with a show element

game flow
- start game new board
- player one picks a box, places tile
- switch player
- then player 2 places tile
- then switch
- every time placeTile if cell is not null then return or break

initialize in console with this:
```
const steve = player('steve')
const beth = player('beth')

GameFlow(steve, beth)
```