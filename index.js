const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d")
const ballRadius = 5;

let x = canvas.width/2;
let y = canvas.height/2;
let dx = .5;
let dy = -.5;

function drawBall(x, y) {
  ctx.beginPath()
  ctx.arc(x,y,ballRadius,0,Math.PI*2, false);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height,);
  drawBall(x, y)
  if (y + dy - ballRadius < 0 || y + dy + ballRadius > canvas.height) {
    dy = -dy
  }
  if (x + dx + ballRadius > canvas.width || x + dx - ballRadius < 0) {
    dx = -dx
  }

  x += dx;
  y += dy;
}
setInterval(draw, 10)
