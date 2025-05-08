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
} from "./helper.js";

let table;
let counter;

function displayField() {
  table = document.getElementById("field");
  table.classList.add("field-" + current_difficult.name);

  if (table.hasChildNodes) {
    table.innerHTML = "";
  }

  for (let i = 1; i <= current_difficult.rows; ++i) {
    let table_row = document.createElement("tr");

    for (let j = 1; j <= current_difficult.cols; ++j) {
      let table_data = document.createElement("td");
      let button = document.createElement("button");
      button.classList.add("button");
      button.classList.add("button-" + current_difficult.name);
      button.classList.add("button-noclicked");
      button.setAttribute("data-position", i + "_" + j);

      table_data.appendChild(button);
      table_row.appendChild(table_data);
    }
    table.appendChild(table_row);
  }

  counter = document.getElementById("counter");

  let img = document.createElement("img");
  img.src = "../img/flag.png";
  let txt = document.createElement("text");
  txt.textContent = current_difficult.knives;

  counter.appendChild(img);
  counter.appendChild(txt);
}

window.onclick = function (event) {
  let target = event.target;
  if (!target.classList.contains("button-noclicked") || final) {
    return;
  }

  let pos = getPos(target);
  let x = pos[0];
  let y = pos[1];
  clickButton(x, y);

  deleteOldAndMakeNew(target, "button-noclicked", "button-clicked");

  if (isKnife(x, y)) {
    target.classList.add("button-knife-clicked");

    for (let current of document.querySelectorAll("button")) {
      pos = getPos(current);
      x = pos[0];
      y = pos[1];

      if (!isKnife(x, y)) {
        continue;
      }
      deleteOldAndMakeNew(current, "button-noclicked", "button-clicked");
      current.classList.add("button-knife");
    }
  } else if (getAmountOfNeighbours(x, y) != 0) {
    getDigit(target, x, y);
  } else {
    clearNeedButtons();
    needClick(x, y, 0);

    for (let current of document.querySelectorAll("button")) {
      if (!need_buttons.includes(current.dataset.position)) {
        continue;
      }

      pos = getPos(current);
      x = pos[0];
      y = pos[1];

      deleteOldAndMakeNew(current, "button-noclicked", "button-clicked");
      if (getAmountOfNeighbours(x, y) != 0) {
        getDigit(current, x, y);
      }
    }
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

  let pos = getPos(target);
  let x = pos[0];
  let y = pos[1];
  let have_flag = clickFlag(x, y);

  if (have_flag) {
    deleteOldAndMakeNew(target, "button-noclicked", "button-flagged");
  } else {
    deleteOldAndMakeNew(target, "button-flagged", "button-noclicked");
  }

  counter.lastChild.textContent = freeFlagged;
  return false;
};

export { displayField };
