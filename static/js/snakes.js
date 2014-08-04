/**
 * Created by northdacoder on 8/4/14.
 */

// Will represent each body cell of the snake
var snakeBody;

function startGame() {
    // Create the initial snake
    createSnake();

    ...
}

function createSnake() {
    // Starting length of the snake will be 5 cells
    var length = 5;

    // Let's set the snake body back to an empty array
    snakeBody = [];

    // Add cells to the snake body starting from the top left hand corner of the screen
    for (var i = length - 1; i >= 0; i--) {
        snakeBody.push({x: i, y: 0});
    }
}