import { timer } from "./display.js";

let wasStarted = false;
let work = true;

function startTimer() {
  wasStarted = true;
}

function stopTimer() {
  work = false;
}

setTimeout(function increaseTime() {
  if (wasStarted && work) {
    ++timer.lastChild.textContent;
  }

  setTimeout(increaseTime, 1000);
}, 1000);

export { startTimer, stopTimer };
