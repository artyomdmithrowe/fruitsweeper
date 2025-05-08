import { final, getAmountOfNeighbours, checkWin } from "./game.js";

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

  if (checkWin()) {
    alert("Win!");
    return;
  }
  alert("Lose!");
}

export { deleteOldAndMakeNew, getPos, getDigit, finalDisplay };
