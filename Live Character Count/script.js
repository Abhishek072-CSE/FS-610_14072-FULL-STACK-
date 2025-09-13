const textarea = document.querySelector("#text");
const count = document.querySelector("#count");
const counter = document.querySelector("#counter");

textarea.addEventListener("input", (event) => {
  const currentLength = event.target.value.length;
  count.textContent = currentLength;
  if (currentLength >= event.target.maxLength) {
    counter.style.color = "red";
  } else {
    counter.style.color = "black";
  }
});
