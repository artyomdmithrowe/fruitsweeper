import {
  current_difficult,
  clickButton,
  clickFlag,
  isKnife,
  getAmountOfNeighbours,
  needClick,
  clearNeedButtons,
  need_buttons,
  final,
  freeFlagged,
} from "./game.js";

import {
  deleteOldAndMakeNew,
  getPos,
  getDigit,
  finalDisplay,
  updateElement,
  GameSound,
} from "./helper.js";

function displayField() {
  let table = document.getElementById("field");
  table.classList.add("field-" + current_difficult.name);

  table.innerHTML = "";

  for (let i = 1; i <= current_difficult.rows; ++i) {
    let table_row = document.createElement("tr");

    for (let j = 1; j <= current_difficult.cols; ++j) {
      let table_data = document.createElement("td");
      let button = document.createElement("button");
      button.classList.add("button");
      button.classList.add("button-" + current_difficult.name);
      button.classList.add("button-noclicked");
      button.setAttribute("data-position", `${i}_${j}`);

      table_data.appendChild(button);
      table_row.appendChild(table_data);
    }
    table.appendChild(table_row);
  }

  let counter = document.getElementById("counter");
  counter.innerHTML = "";
  updateElement(counter, "../img/flag.png", current_difficult.knives);

  let timer = document.getElementById("timer");
  timer.innerHTML = "";
  updateElement(timer, "../img/clock.png", 0);
}

window.onclick = function (event) {
  let target = event.target;
  if (!target.classList.contains("button-noclicked") || final) {
    return;
  }

  GameSound.play();

  let pos = getPos(target);
  clickButton(pos["x"], pos["y"]);

  deleteOldAndMakeNew(target, "button-noclicked", "button-clicked");

  if (isKnife(pos["x"], pos["y"])) {
    target.classList.add("button-knife-clicked");

    document.querySelectorAll("button").forEach((button) => {
      pos = getPos(button);

      if (isKnife(pos["x"], pos["y"])) {
        deleteOldAndMakeNew(button, "button-noclicked", "button-clicked");
        button.classList.add("button-knife");
      }
    });
  } else if (getAmountOfNeighbours(pos["x"], pos["y"]) != 0) {
    getDigit(target, pos["x"], pos["y"]);
  } else {
    clearNeedButtons();
    needClick(pos["x"], pos["y"], 0);

    document.querySelectorAll("button").forEach((button) => {
      if (need_buttons.includes(button.dataset.position)) {
        pos = getPos(button);

        deleteOldAndMakeNew(button, "button-noclicked", "button-clicked");
        if (getAmountOfNeighbours(pos["x"], pos["y"]) != 0) {
          getDigit(button, pos["x"], pos["y"]);
        }
      }
    });
  }

  finalDisplay();
};

window.oncontextmenu = function (event) {
  let target = event.target;
  if (target.tagName != "BUTTON" || final) {
    return false;
  }
  if (target.classList.contains("button-clicked")) {
    return false;
  }

  GameSound.play();

  let pos = getPos(target);
  let have_flag = clickFlag(pos["x"], pos["y"]);

  if (have_flag) {
    deleteOldAndMakeNew(target, "button-noclicked", "button-flagged");
  } else {
    deleteOldAndMakeNew(target, "button-flagged", "button-noclicked");
  }

  document.getElementById("counter").lastChild.textContent = freeFlagged;
  return false;
};

export { displayField };
