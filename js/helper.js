import { final, getAmountOfNeighbours, checkWin, isKnife } from "./game.js";
import { stopTimer } from "./timer.js";

function deleteOldAndMakeNew(button, old_atr, new_atr) {
  button.classList.remove(old_atr);
  button.classList.add(new_atr);
}

function getPos(target) {
  let pos = target.dataset.position;
  let underscore_pos = pos.indexOf("_");
  let x = pos.substr(0, underscore_pos);
  let y = pos.substr(underscore_pos + 1, pos.length - underscore_pos - 1);

  return [x, y];
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

function finalDisplay() {
  if (!final) {
    return;
  }

  stopTimer();

  if (checkWin()) {
    alert("Win!");

    for (let current of document.querySelectorAll("button")) {
      let pos = getPos(current);
      let x = pos[0];
      let y = pos[1];

      if (!isKnife(x, y)) {
        continue;
      }
      deleteOldAndMakeNew(current, "button-noclicked", "button-flagged");
    }

    return;
  }
  alert("Lose!");
}

export { deleteOldAndMakeNew, getPos, getDigit, finalDisplay };
