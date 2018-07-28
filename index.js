const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d")
const ballRadius = 5;
const paddleHeight = 30;
const paddleWidth = 5;
const brickRowCount = 5;
const brickColumnCount = 5;
const brickWidth = 10;
const brickHeight = 10;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetRight = canvas.width - 60;
const bricks = []
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = []
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 }
  }
}

let paddleY = (canvas.height - paddleHeight)/2;
let upPressed = false;
let downPressed = false;
let ballX = canvas.width/2;
let ballY = canvas.height/2;
let dx = .5;
let dy = -.5;

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let brickX = (c*(brickWidth+brickPadding)) + brickOffsetRight
      let brickY = (r*(brickWidth+brickPadding)) + brickOffsetTop
      if (bricks[c][r].status === 1) {
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status === 1) {
        if (ballX > b.x && ballX < b.x + brickWidth & ballY > b.y && ballY < b.y + brickHeight) {
          dx = -dx;
          b.status = 0;
        }
      }
    }
  }
}

function drawPaddleLeft() {
  ctx.beginPath();
  ctx.rect(0, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath()
  ctx.arc(ballX,ballY,ballRadius,0,Math.PI*2, false);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height,);
  drawPaddleLeft();
  collisionDetection()
  drawBricks();
  drawBall();
  if (ballY + dy - ballRadius < 0 || ballY + dy + ballRadius > canvas.height) {
    dy = -dy
  };
  if (ballX + dx > canvas.width - ballRadius) {
    dx = -dx
  }
  else if (ballX + dx < ballRadius) {
    if (ballY > paddleY && ballY < paddleY + paddleHeight) {
      dx = -dx
    }
    else {
      document.location.reload()
      setTimeout(function(){alert("Game over!")}, 10)
    }
  }


  if (downPressed && paddleY < canvas.height - paddleHeight) {
    paddleY += 1
  }
  else if (upPressed && paddleY > 0) {
    paddleY -= 1
  }

  ballX += dx;
  ballY += dy;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(event) {
  if (event.keyCode === 40) {
    downPressed = true
  }
  else if (event.keyCode === 38) {
    upPressed = true
  }
}

function keyUpHandler(event) {
  if (event.keyCode === 40) {
    downPressed = false
  }
  else if (event.keyCode === 38) {
    upPressed = false
  }
}

setInterval(draw, 5)
