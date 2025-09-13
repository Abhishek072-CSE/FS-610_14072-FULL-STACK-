const canvas = document.querySelector("#canvas");

const ctx = canvas.getContext("2d");

let isDrawing = false;

canvas.addEventListener("mousedown", (event) => {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
});

canvas.addEventListener("mousemove", (event) => {
  if (!isDrawing) return;
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
});

canvas.addEventListener("mouseup",()=> isDrawing = false)
canvas.addEventListener("mouseleave",()=> isDrawing = false)
