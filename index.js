const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d")
const ballRadius = 5;
const paddleHeight = 20;
const paddleWidth = 5;

let paddleY = (canvas.height - paddleHeight)/2;
let upPressed = false;
let downPressed = false;
let ballX = canvas.width/2;
let ballY = canvas.height/2;
let dx = .5;
let dy = -.5;

function drawPaddle() {
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
  drawPaddle();
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
    paddleY += 2
  }
  else if (upPressed && paddleY > 0) {
    paddleY -= 2
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

setInterval(draw, 10)
