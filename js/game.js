import { displayField } from "./display.js";

let difficulties = {
  easy: {
    name: "easy",
    rows: 9,
    cols: 9,
    knives: 10,
  },
  medium: {
    name: "medium",
    rows: 16,
    cols: 16,
    knives: 40,
  },
  hard: {
    name: "hard",
    rows: 30,
    cols: 16,
    knives: 99,
  },
  extreme: {
    name: "extreme",
    rows: 30,
    cols: 24,
    knives: 160,
  },
};

class Cell {
  constructor() {
    this.isKnife = false;
    this.isClicked = false;
    this.isFlagged = false;
    this.amountOfNeighbours = 0;
  }
}

let current_difficult = difficulties.easy;
let firstClick = false;
let final = false;
let notClicked =
  current_difficult.rows * current_difficult.cols - current_difficult.knives;
let field = [];

function setDifficulty(new_difficulty) {
  current_difficult = new_difficulty;
  startGame();
}

function startGame() {
  createField();
  setKnives();
  updateField();
  returnValues();
  displayField();
}

function createField() {
  for (let i = 0; i < current_difficult.rows + 2; ++i) {
    field[i] = [];
    for (let j = 0; j < current_difficult.cols + 2; ++j) {
      field[i][j] = new Cell();
    }
  }
}

function setKnives() {
  let knives = 0;
  while (knives < current_difficult.knives) {
    let row = 1 + Math.floor(Math.random() * current_difficult.rows);
    let col = 1 + Math.floor(Math.random() * current_difficult.cols);

    if (!field[row][col].isKnife) {
      field[row][col].isKnife = true;
      ++knives;
    }
  }
}

function updateField() {
  for (let i = 1; i <= current_difficult.rows; ++i) {
    for (let j = 1; j <= current_difficult.cols; ++j) {
      for (let k = -1; k <= 1; ++k) {
        for (let l = -1; l <= 1; ++l) {
          if (k == l && l == 0) {
            continue;
          }

          if (field[i + k][j + l].isKnife) {
            ++field[i][j].amountOfNeighbours;
          }
        }
      }
    }
  }
}

function returnValues() {
  firstClick = false;
  final = false;
  notClicked =
    current_difficult.rows * current_difficult.cols - current_difficult.knives;
}

function clickButton(x, y) {
  if (!firstClick) {
    while (field[x][y].isKnife) {
      createField();
      setKnives();
      updateField();
    }
  }
  firstClick = true;
  field[x][y].isClicked = true;

  if (field[x][y].isKnife) {
    final = true;
    return;
  }

  --notClicked;
  if (checkWin()) {
    final = true;
  }
}

function clickFlag(x, y) {
  field[x][y].isFlagged = !field[x][y].isFlagged;
  return field[x][y].isFlagged;
}

function isKnife(x, y) {
  return field[x][y].isKnife;
}

function getAmountOfNeighbours(x, y) {
  return field[x][y].amountOfNeighbours;
}

let need_buttons = [];

function clearNeedButtons() {
  need_buttons = [];
}

function needClick(x, y, t) {
  x = parseInt(x);
  y = parseInt(y);

  if (x * y == 0 || x > current_difficult.rows || y > current_difficult.cols) {
    return;
  }
  if (need_buttons.includes(x + "_" + y)) {
    return;
  }

  need_buttons.push(x + "_" + y);
  field[x][y].isClicked = true;

  if (t != 0) {
    --notClicked;
  }

  if (field[x][y].amountOfNeighbours != 0) {
    return;
  }

  for (let k = -1; k <= 1; ++k) {
    for (let l = -1; l <= 1; ++l) {
      if (field[x + k][y + l].isClicked) {
        continue;
      }

      needClick(x + k, y + l, t + 1);
    }
  }
}

function checkWin() {
  return notClicked == 0;
}

export {
  setDifficulty,
  difficulties,
  current_difficult,
  clickButton,
  clickFlag,
  isKnife,
  getAmountOfNeighbours,
  needClick,
  clearNeedButtons,
  need_buttons,
  final,
  checkWin,
};
