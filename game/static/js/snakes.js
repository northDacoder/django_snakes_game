$(document).ready(function () {

    var canvas = $("#canvas")[0];
    var canvasContext = canvas.getContext("2d");
    var width = $("#canvas").width();
    var height = $("#canvas").height();
    var food;
    var score;

    var cellWidth = 20;
    var snakeBody;
    var currentDirection;
    var gameLoopInterval;


    // Start the game
    function startGame() {

        // Initialize the score to 0 every time we start a game
        score = 0;

        // Set the default loop to start the game every 60 seconds
        gameLoopInterval = setInterval(gameLoop, 60);
        createFood();
        createSnake();
        currentDirection = "right";

    }

    // Game loop that will define our snake
    function gameLoop() {
        var nextPosition = getNextPosition();

        if (checkGameOver(nextPosition, snakeBody)) {
            gameOver();
            return;
        }

        if (!checkEatFood(nextPosition)) {
            // Remove the tail of the snake
            snakeBody.pop();
        }

        // Add the next position to the front of the snake
        snakeBody.unshift(nextPosition);

        paintCanvas();
    }


    function gameOver() {
        clearInterval(gameLoopInterval);
    }

    // Let's set up the arrow keys for our game
    $(document).keydown(function (e) {
        var key = e.which;

        // This will change the direction of the snake
        // Make sure we check that the user isn't trying to have the snake go backwards
        if (key == "37" && currentDirection != "right") currentDirection = "left";
        else if (key == "38" && currentDirection != "down") currentDirection = "up";
        else if (key == "39" && currentDirection != "left") currentDirection = "right";
        else if (key == "40" && currentDirection != "up") currentDirection = "down";
    });


    function createFood() {
        food = {
            x: Math.round(Math.random() * (width - cellWidth) / cellWidth),
            y: Math.round(Math.random() * (height - cellWidth) / cellWidth)
        };
    }


    // Function to get the next position of the snake
    function getNextPosition() {

        // First let's grab the snake's head's x and y
        var currentPosition = snakeBody[0];
        var nextPosition = {
            x: currentPosition.x,
            y: currentPosition.y
        };

        // Increment the x or y value depending on what
        // direction the snake is going
        if (currentDirection == "right") nextPosition.x++;
        else if (currentDirection == "left") nextPosition.x--;
        else if (currentDirection == "up") nextPosition.y--;
        else if (currentDirection == "down") nextPosition.y++;

        return nextPosition;

    }


    // Check if snake is on the same space as food
    function checkEatFood(position) {

        if (position.x == food.x && position.y == food.y) {
            createFood();

            // Increment the score by 1
            score++;

            return true;
        } else {
            return false;
        }
    }


    // Paint the snake and food
    function paintCanvas() {

        // Lets fill in the canvas colors
        canvasContext.fillStyle = "rgba(0,0,0,0)";
        canvasContext.fillRect(0, 0, width, height);
        canvasContext.strokeStyle = "rgba(0,0,0,0)";
        canvasContext.strokeRect(0, 0, width, height);

        // Paint the snake body
        for (var i = 0; i < snakeBody.length; i++) {
            var cell = snakeBody[i];
            if (i == 0) {
                paintCell(cell.x, cell.y, "green");
            } else {
                paintCell(cell.x, cell.y, "red");
            }
        }
        paintCell(food.x, food.y, "orange");
    }


    // Initialize our snake
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


    // Create a function to paint the cells
    function paintCell(x, y, color) {

        // Set the fill color for the rectangle you are about to color
        canvasContext.fillStyle = color;

        // Paint the rectangle the color we just defined
        canvasContext.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);

        // Set the color of the rectangle outline
        canvasContext.strokeStyle = "white";

        // Draw the rectangles outline
        canvasContext.strokeRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);

        // Paint the score text
        // Reset the fill color of the score text we are about to paint
        canvasContext.fillStyle = 'white';
        canvasContext.font = '60pt Helvetica';
        var scoreText = "Score: " + score;
        canvasContext.fillText(scoreText, 5, height - 5);
    }


    // Check if snake has collided with walls or itself
    function checkGameOver(position, snakeBody) {
        if (position.x == -1 || position.x == width / cellWidth) {
            // If the snake has gone off the left or right boundaries, game over!
            return true;
        } else if (position.y == -1 || position.y == height / cellWidth) {
            // If the snake has gone off the top or bottom boundaries, game over!
            return true;
        } else {
            // If the snake's next position collides with another cell in it's body, game over!
            for (var i = 0; i < snakeBody.length - 1; i++) {
                if (snakeBody[i].x == position.x && snakeBody[i].y == position.y) {
                    return true;
                }
            }
            return false;
        }
    }


    startGame();

});