//canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

//variables
let score = 0;
let award;
let collision;
let speed = 30;
let speedTime = 100;
let coordinates = { x: 0, y: 0 };

//player
let position = { x: 300, y: 300 };
let box = 30;
let snake = [
  { x: 300, y: 300 },
  { x: 300, y: 330 },
  { x: 300, y: 360 },
  { x: 300, y: 390 },
];
let auto;
let head;
let d;
let GAME;

//points
let randomX = (canvas.width - 30) / 30;
let randomY = (canvas.height - 30) / 30;
let pointsBox = 30;
let pointPositionX = Math.floor(Math.random() * randomX);
let pointPositionY = Math.floor(Math.random() * randomY);
pointPositionX = pointPositionX * 30;
pointPositionY = pointPositionY * 30;

// code for change frames in requestAnimationFrame
var stop = false;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;

// initialize the timer variables and start the animation
startAnimating(10);
function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}
// the animation loop calculates time elapsed since the last loop
// and only draws if your specified fps interval is achieved

function animate() {
  // request another frame
  requestAnimationFrame(animate);

  // calc elapsed time since last loop
  now = Date.now();
  elapsed = now - then;

  // if enough time has elapsed, draw the next frame
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);

    // Put your drawing code here
    buildBoard();
    headSnake();
    drawPlayer();
    drawPoints();
  }
}

animate();

//board
function buildBoard() {
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "darkgreen";
  for (let i = 0; i < canvas.width; i += 60) {
    for (let j = 0; j < canvas.height; j += 60) {
      ctx.fillRect(i, j, 30, 30);
    }
  }
  for (let i = 30; i < canvas.width; i += 60) {
    for (let j = 30; j < canvas.height; j += 60) {
      ctx.fillRect(i, j, 30, 30);
    }
  }
  ctx.closePath();
}

//arrows
window.addEventListener("keydown", arrows);

function arrows(event) {
  if (event.defaultPrevented) return;

  switch (event.key) {
    case "Down":
    case "ArrowDown":
      if (d != "UP") d = "DOWN";
      break;
    case "Up":
    case "ArrowUp":
      if (d != "DOWN") d = "UP";
      GAME = true;
      break;
    case "Left":
    case "ArrowLeft":
      if (d != "RIGHT") d = "LEFT";
      GAME = true;
      break;
    case "Right":
    case "ArrowRight":
      if (d != "LEFT") d = "RIGHT";
      GAME = true;
      break;
    case "Enter":
      // Do something for "enter" or "return" key press.
      break;
    case "Escape":
      // Do something for "esc" key press.
      break;
    default:
      return;
  }
  event.preventDefault();
}

//player
function draw(snakePart) {
  ctx.fillStyle =
    snakePart.x == head.x && snakePart.y == head.y ? "white" : "yellow";
  ctx.beginPath();
  ctx.fillRect(snakePart.x, snakePart.y, box, box);
  ctx.strokeRect(snakePart.x, snakePart.y, box, box);
}

function drawPlayer() {
  snake.forEach(draw);
  if (GAME) {
    let snakeX = head.x;
    let snakeY = head.y;

    if (d == "LEFT") snakeX -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "UP") snakeY -= box;
    if (d == "DOWN") snakeY += box;

    if (snake[0].x == pointPositionX && snake[0].y == pointPositionY) {
      score++;
      pointPositionX = Math.floor(Math.random() * randomX);
      pointPositionY = Math.floor(Math.random() * randomY);
      pointPositionX = pointPositionX * 30;
      pointPositionY = pointPositionY * 30;
    } else snake.pop();
    let newHead = {
      x: snakeX,
      y: snakeY,
    };

    snake.unshift(newHead);
  }
}

function headSnake() {
  head = { x: snake[0].x, y: snake[0].y };
}

//points
function drawPoints() {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.fillRect(pointPositionX, pointPositionY, pointsBox, pointsBox);
  ctx.closePath();
}
