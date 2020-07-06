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

//points
let randomX = (canvas.width - 30) / 30;
let randomY = (canvas.height - 30) / 30;
let pointPositionX = Math.floor(Math.random() * randomX);
let pointPositionY = Math.floor(Math.random() * randomY);
let pointsBox = 30;
pointPositionX = pointPositionX * 30;
pointPositionY = pointPositionY * 30;

//game
function init() {
  buildBoard();
  headSnake();
  drawPlayer();
  points(pointPositionX, pointPositionY);
  requestAnimationFrame(init);
}

init();

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

//player
function draw(snakePart) {
  if (snakePart.x == head.x && snakePart.y == head.y)
    ctx.fillStyle = "white";
  else
    ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.fillRect(snakePart.x, snakePart.y, box, box);
  ctx.strokeRect(snakePart.x, snakePart.y, box, box);
}

function drawPlayer() {
  snake.forEach(draw);
}

//this code it isn't my (:
function headSnake() {
  head = { x: snake[0].x, y: snake[0].y };
}

//arrows
window.addEventListener("keydown", arrows);

function arrows(event) {
  if (event.defaultPrevented) return;

  switch (event.key) {
    case "Down":
    case "ArrowDown":
      if (auto == 2) auto = 2;
      else auto = 1;
      coordinates.x = head.x;
      break;
    case "Up":
    case "ArrowUp":
      if (auto == 1) auto = 1;
      else auto = 2;
      coordinates.x = head.x;
      break;
    case "Left":
    case "ArrowLeft":
      if (auto == 4) auto = 4;
      else auto = 3;
      coordinates.y = head.y;
      break;
    case "Right":
    case "ArrowRight":
      if (auto == 3) auto = 3;
      else auto = 4;
      coordinates.y = head.y;
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
  console.log(event.key);
  event.preventDefault();
}

//auto move
function autoMoveY() {
  if (auto == 1) {
    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x == head.x) { // czemu coordianate nie dziala a head dziala ??
        snake[i].y += speed;
      } else {
        snake[i].x -= speed;
      }
      drawPlayer();
    }
  } else {
    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x == head.x) { // czemu coordianate nie dziala a head dziala ??
        snake[i].y += speed;
      } else {
        snake[i].x -= speed;
      }
      drawPlayer();
    }
  }
  ctx.clearRect(0, 0, canvas.height, canvas.width);
  buildBoard();
  points(pointPositionX, pointPositionY);
}

function autoMoveX() {
  if (auto == 3) {
    for (let i = 0; i < snake.length; i++) {
      if (snake[i].y == head.y) { // czemu coordianate nie dziala a head dziala ??
        snake[i].x += speed;
      } else {
        snake[i].y += speed;
      }
      drawPlayer();
    }
  } else {
    for (let i = 0; i < snake.length; i++) {
      if (snake[i].y == head.y) { // czemu coordianate nie dziala a head dziala ??
        snake[i].x += speed;
      } else {
        snake[i].y -= speed;
      }
      drawPlayer();
    }
  }
  ctx.clearRect(0, 0, canvas.height, canvas.width);
  buildBoard();
  points(pointPositionX, pointPositionY);
}

document.addEventListener("keyup", move);

let autoY = 0;
let autoX = 0;

function move() {
  if (auto == 1) {
    myStopFunctionY();
    myStopFunctionX();
    speed = 30;
    autoY = setInterval(autoMoveY, speedTime);
  } else if (auto == 2) {
    myStopFunctionY();
    myStopFunctionX();
    speed = -30;
    autoY = setInterval(autoMoveY, speedTime);
  } else if (auto == 3) {
    myStopFunctionY();
    myStopFunctionX();
    speed = -30;
    autoX = setInterval(autoMoveX, speedTime);
  } else if (auto == 4) {
    myStopFunctionY();
    myStopFunctionX();
    speed = 30;
    autoX = setInterval(autoMoveX, speedTime);
  }
}

function myStopFunctionY() {
  clearInterval(autoY);
}

function myStopFunctionX() {
  clearInterval(autoX);
}

//points
function drawPoints(x, y) {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.fillRect(x, y, pointsBox, pointsBox);
  ctx.closePath();
}

function points(pointPositionX, pointPositionY) {
  x = pointPositionX;
  y = pointPositionY;
  drawPoints(x, y);
  requestAnimationFrame(points);
}
