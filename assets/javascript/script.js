const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.height = 600;
canvas.width = 600;

//board
function buildBoard() {
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, 600, 600);
  ctx.fillStyle = "darkgreen";
  for (let i = 0; i < 600; i += 60) {
    for (let j = 0; j < 600; j += 60) {
      ctx.fillRect(i, j, 30, 30);
    }
  }
  for (let i = 30; i < 600; i += 60) {
    for (let j = 30; j < 600; j += 60) {
      ctx.fillRect(i, j, 30, 30);
    }
  }
  ctx.closePath();
}

buildBoard();

//player
let positionX = 301;
let positionY = 301;

function draw(x, y) {
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.fillRect(x, y, 28, 28);
  ctx.closePath();
}

function player(positionX, positionY) {
  this.x = positionX;
  this.y = positionY;
  draw(x, y);
  requestAnimationFrame(player);
}
player(positionX, positionY);

//player movement auto
function autoMovement(){
    
}



//arrows
window.addEventListener(
  "keydown",
  function (event) {
    if (event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case "Down": // IE/Edge specific value
      case "ArrowDown":
        ctx.clearRect(0, 0, canvas.height, canvas.width);
        buildBoard();
        positionY += 30;
        player(positionX, positionY);
        break;
      case "Up": // IE/Edge specific value
      case "ArrowUp":
        ctx.clearRect(0, 0, canvas.height, canvas.width);
        buildBoard();
        positionY -= 30;
        player(positionX, positionY);
        break;
      case "Left": // IE/Edge specific value
      case "ArrowLeft":
        ctx.clearRect(0, 0, canvas.height, canvas.width);
        buildBoard();
        positionX -= 30;
        player(positionX, positionY);
        break;
      case "Right": // IE/Edge specific value
      case "ArrowRight":
        ctx.clearRect(0, 0, canvas.height, canvas.width);
        buildBoard();
        positionX += 30;
        player(positionX, positionY);
        break;
      case "Enter":
        // Do something for "enter" or "return" key press.
        break;
      case "Esc": // IE/Edge specific value
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
