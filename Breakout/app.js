const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score')
const blockwidth = 100;
const blockHeight = 20;
const boardwidth = 560;
const boardHeight = 300;
const ballDiameter = 20;
let timerId;
let xDirection = 2
let yDirection = 2
let score = 0

const userStart = [230, 10];
let currentPosition = userStart

const ballStart = [270, 40]
let ballCurrentPositions = ballStart

// create block
class Block {
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockwidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockwidth, yAxis + blockHeight]
    }
}

// all blocks
const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210)
] 

// draw block
function addBlocks(){
    for (let i = 0; i < blocks.length; i++){
        const block = document.createElement('div');
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px' 
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block);
    }
}

addBlocks()

// user
const user = document.createElement('div');
user.classList.add('user')
drawUser()
grid.appendChild(user)

// draw the user
function drawUser(){
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

// move user
function moveUser(e) {
    switch(e.key){
        case 'ArrowLeft':
            if (currentPosition[0] > 0){
                currentPosition[0] -= 10
                drawUser()
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0] < boardwidth - blockwidth){
                currentPosition[0] += 10
                drawUser()
            }
            break;
    }
}

document.addEventListener('keydown', moveUser)

// draw the ball
function drawBall(){
    ball.style.left = ballCurrentPositions[0] + 'px'
    ball.style.bottom = ballCurrentPositions[1] + 'px'
}

// add ball 
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

// move ball 
function moveBall(){
    ballCurrentPositions[0] += xDirection
    ballCurrentPositions[1] += yDirection
    drawBall()
    checkForCollitions()
}

timerId = setInterval(moveBall, 30)

// check for collitions
function checkForCollitions(){
    // check for block collitions
    for (let i = 0; i < blocks.length; i++){
        if ((ballCurrentPositions[0] > blocks[i].bottomLeft[0] && ballCurrentPositions[0] < blocks[i].bottomRight[0]) 
            && (ballCurrentPositions[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPositions[1] < blocks[i].topLeft[1]){
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()
            score ++;
            scoreDisplay.innerHTML = score;

            // check for win
            if (blocks.length === 0){
                scoreDisplay.innerHTML = 'You Win'
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUser)
            }
        }
    }

    // check for wall collitions
    if (ballCurrentPositions[0] >= (boardwidth - ballDiameter) 
        || ballCurrentPositions[1] >= (boardHeight - ballDiameter) 
        || ballCurrentPositions[0] <= 0){
        changeDirection()
    }

    // check for user collitions
    if ((ballCurrentPositions[0] > currentPosition[0] && ballCurrentPositions[0] < currentPosition[0] + blockwidth) 
        && (ballCurrentPositions[1] > currentPosition[1]) && ballCurrentPositions[1] < currentPosition[1] + blockHeight){
        changeDirection()
    }

    // check for game over
    if (ballCurrentPositions[1] <= 0){
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'You Lose!'
        document.removeEventListener('keydown', moveUser);
    }
}

// change direction to the ball
function changeDirection(){
    if (xDirection === 2 && yDirection === 2){
        yDirection = -2
        return
    }
    if (xDirection === 2 && yDirection === -2){
        xDirection = -2
        return
    }
    if (xDirection === -2 && yDirection === -2){
        yDirection = 2
        return
    }
    if (xDirection === -2 && yDirection === 2){
        xDirection = 2
        return
    }
}

