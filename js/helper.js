import { final, getAmountOfNeighbours, checkWin, isKnife } from "./game.js";
import { stopTimer } from "./timer.js";

const winSound = new Audio("../sound/win.mp3");
const loseSound = new Audio("../sound/lose.mp3");

function deleteOldAndMakeNew(button, old_atr, new_atr) {
  button.classList.remove(old_atr);
  button.classList.add(new_atr);
}

function getPos(target) {
  let pos = target.dataset.position;
  let underscore_pos = pos.indexOf("_");
  let x = pos.substr(0, underscore_pos);
  let y = pos.substr(underscore_pos + 1, pos.length - underscore_pos - 1);

  return { x: x, y: y };
}

function getDigit(target, x, y) {
  target.classList.add("button-digits");
  target.setAttribute(
    "style",
    'background-image: url("../img/digits/' +
      getAmountOfNeighbours(x, y) +
      '.png")'
  );
}

function updateElement(element, path_to_img, element_text) {
  let img = document.createElement("img");
  img.src = path_to_img;
  let txt = document.createElement("text");
  txt.textContent = element_text;

  element.appendChild(img);
  element.appendChild(txt);
}

function finalDisplay() {
  if (!final) {
    return;
  }

  stopTimer();

  if (checkWin()) {
    document.querySelectorAll("button").forEach((button) => {
      let pos = getPos(button);

      if (isKnife(pos["x"], pos["y"])) {
        deleteOldAndMakeNew(button, "button-noclicked", "button-flagged");
      }
    });

    addWinEffects();
    showConfetti();
    setTimeout(() => alert("Win!"), 500);
    document.querySelectorAll("button-clicked").forEach((button) => {
      button.classList.add("win-glow");
    });
    winSound.play();
  } else {
    setTimeout(() => alert("Game Over!"), 800);
    loseSound.play();
  }
}

function addWinEffects() {
  const cells = document.querySelectorAll(".button-clicked:not(.button-knife)");
  cells.forEach((cell) => {
    cell.style.animation = "cell-glow 1.5s ease-in-out infinite";
  });

  const timerElement = document.querySelector(".timer text");
  timerElement.style.animation = "rainbow-pulse 2s infinite";
}

function showConfetti() {
  const container = document.createElement("div");

  for (let i = 0; i < 500; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";

    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.animationDelay = `${Math.random() * 2}s`;
    confetti.style.width = `${Math.random() * 8 + 8}px`;
    confetti.style.height = confetti.style.width;

    const rotation = (Math.random() - 0.5) * 180;
    const translateX = (Math.random() - 0.5) * 200;
    confetti.style.transform = `translateX(${translateX}px) rotate(${rotation}deg)`;

    container.appendChild(confetti);
  }

  document.body.appendChild(container);

  setTimeout(() => {
    container.remove();
  }, 3000);

  console.log(window.localStorage);
}

export { deleteOldAndMakeNew, getPos, getDigit, finalDisplay, updateElement };
