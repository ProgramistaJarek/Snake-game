const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let score;
let award;
let collision;
let speed = 30;
let speedTime = 100;

canvas.width = 600;
canvas.height = 600;

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
buildBoard();

//player
let positionX = 301;
let positionY = 301;
let playerWidth = 29;
let playerHeight = 29;
let playerLenght = 4;

function draw(x, y) {
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.fillRect(x, y, playerWidth, playerHeight);
  ctx.closePath();
}

let player = (positionX, positionY) => {
  this.x = positionX;
  this.y = positionY;
  for (let i = 0; i < playerLenght; i++) {
    draw(x, y + i * 30);
  }
  requestAnimationFrame(player);
};
player(positionX, positionY);

let auto = 0;

//arrows
window.addEventListener(
  "keydown",
  function (event) {
    if (event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case "Down":
      case "ArrowDown":
        if (auto == 2) auto = 2;
        else auto = 1;
        break;
      case "Up":
      case "ArrowUp":
        if (auto == 1) auto = 1;
        else auto = 2;
        break;
      case "Left":
      case "ArrowLeft":
        if (auto == 4) auto = 4;
        else auto = 3;
        break;
      case "Right":
      case "ArrowRight":
        if (auto == 3) auto = 3;
        else auto = 4;
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
  },
  true
);

//auto move
function autoMoveY() {
  positionY += speed;
  player(positionX, positionY);
  ctx.clearRect(0, 0, canvas.height, canvas.width);
  buildBoard();
  player(positionX, positionY);
  points(pointPositionX, pointPositionY);
}

function autoMoveX() {
  positionX += speed;
  player(positionX, positionY);
  ctx.clearRect(0, 0, canvas.height, canvas.width);
  buildBoard();
  player(positionX, positionY);
  points(pointPositionX, pointPositionY);
}

document.addEventListener("keyup", move);

var autoY = 0;
var autoX = 0;

function move() {
  if (auto == 1) {
    myStopFunctionY();
    myStopFunctionX();
    speed = 30;
    positionX = positionX;
    autoY = setInterval(autoMoveY, speedTime);
  } else if (auto == 2) {
    myStopFunctionY();
    myStopFunctionX();
    speed = -30;
    positionX = positionX;
    autoY = setInterval(autoMoveY, speedTime);
  } else if (auto == 3) {
    myStopFunctionY();
    myStopFunctionX();
    speed = -30;
    positionY = positionY;
    autoX = setInterval(autoMoveX, speedTime);
  } else if (auto == 4) {
    myStopFunctionY();
    myStopFunctionX();
    speed = 30;
    positionY = positionY;
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

let randomX = (canvas.width - 30) / 30;
let randomY = (canvas.height - 30) / 30;

let pointPositionX = Math.floor(Math.random() * randomX);
let pointPositionY = Math.floor(Math.random() * randomY);
let pointWidth = 30;
let pointHeight = 30;

console.log(pointPositionX * 30);
console.log(pointPositionY * 30);
pointPositionX = pointPositionX * 30;
pointPositionY = pointPositionY * 30;

function drawPoints(x, y) {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.fillRect(x, y, pointWidth, pointHeight);
  ctx.closePath();
}

let points = (pointPositionX, pointPositionY) => {
  this.x = pointPositionX;
  this.y = pointPositionY;
  drawPoints(x, y);
  requestAnimationFrame(points);
};
points(pointPositionX, pointPositionY);
