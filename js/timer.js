import { firstClick, final } from "./game.js";

function startTimer() {}

function stopTimer() {}

setTimeout(function increaseTime() {
  if (firstClick && !final) {
    ++document.getElementById("timer").lastChild.textContent;
  }

  setTimeout(increaseTime, 1000);
}, 1000);

export { startTimer, stopTimer };
