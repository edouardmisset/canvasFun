const canvas = document.querySelector("#draw");
const context = canvas.getContext("2d");
context.lineCap = "round";
context.lineJoin = "round";

// When true, moving the mouse draws on the canvas
let isDrawing = false;
let x = 0;
let y = 0;
let hue = 0;
let width = 10;
let direction = true;

// Adding Event listeners to the canvas for each mouse event.
canvas.addEventListener("mouseup", deactivateDrawing);
canvas.addEventListener("mouseout", deactivateDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", (e) => {
  [x, y] = [e.offsetX, e.offsetY];
  isDrawing = true;
  // console.log(`${x}, ${y}`);
});

function deactivateDrawing() {
  isDrawing = false;
}

function draw(e) {
  if (isDrawing) {
    [x, y] = [e.offsetX, e.offsetY];
    context.beginPath();
    context.strokeStyle = `hsl(${hue}, 50%, 50%)`;
    context.lineWidth = width;
    context.moveTo(x, y);
    context.lineTo(e.offsetX, e.offsetY);
    context.stroke();
    context.closePath();
    hue++;

    width >= 100 ? (direction = !direction) : 0;
    width <= 10 ? (direction = !direction) : 0;
    if (direction && width < 100) {
      width++;
    } else if (!direction && width > 10) {
      width--;
    }
  }
}
