// Change direction based on input
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (direction != 2) {
        direction = 0
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    speed = Math.min(200, speed + 20)
})
// Speed control
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    speed = Math.max(50, speed - 20)
})
// Initialize game
function startGame () {
    // Create the snake with a single segment
    snake.push(sprites.create(img`
        2 
        `, SpriteKind.Player))
    snake[0].setPosition(80, 60)
    // Spawn the first fruit
    spawnFruit()
    game.onUpdateInterval(speed, moveSnake);
}
function spawnFruit () {
    fruit = sprites.create(img`
        5 
        `, SpriteKind.Food)
    fruit.setPosition(Math.randomRange(10, 150), Math.randomRange(10, 110))
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (direction != 1) {
        direction = 3
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (direction != 3) {
        direction = 1
    }
})
function moveSnake () {
    // Create a new head segment for the snake
    head = sprites.create(img`
        2 
        `, SpriteKind.Player)
    head.setPosition(snake[0].x, snake[0].y)
    // Update the position based on the direction
    // Left
    if (direction == 0) {
        // Down
        head.y += 10
    } else if (direction == 1) {
        // Right
        head.x += 10
    } else if (direction == 2) {
        // Up
        head.y -= 10;
    } else if (direction == 3) {
        head.x -= 10;
    }
    // Handle collision with walls
    if (head.x < 0 || head.x > 160 || head.y < 0 || head.y > 120) {
        game.over(false)
    }
    // Check collision with the snake itself
    for (let i = 0; i <= snake.length - 1; i++) {
        if (head.overlapsWith(snake[i]) && i != 0) {
            game.over(false)
        }
    }
    // Check if the snake eats the fruit
    if (head.overlapsWith(fruit)) {
        score += 1
        spawnFruit()
    } else {
        // Remove the tail segment to keep the snake same length
        tail = snake.pop()
        if (tail) {
            tail.destroy()
        }
    }
    // Update the snake segments
    snake.unshift(head)
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (direction != 0) {
        direction = 2
    }
})
/**
 * Snake Game in MakeCode Arcade
 */
/**
 * This game allows the player to control a snake that moves in a grid, growing as it eats fruits.
 */
/**
 * Key features include directional movement, speed control, collision detection, and game over conditions.
 */
/**
 * The snake begins moving to the right to avoid an immediate game over state.
 */
let tail: Sprite = null
let score = 0
let head: Sprite = null
let snake: Sprite[] = []
let speed = 0
let direction = 0
let fruit: Sprite;
// Start moving right
direction = 1
speed = 100
// Start the game
startGame()
