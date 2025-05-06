let difficulties = {
  easy: {
    name: "Easy",
    rows: 9,
    cols: 9,
    fruits: 10,
  },
  medium: {
    name: "Medium",
    rows: 16,
    cols: 16,
    fruits: 40,
  },
  hard: {
    name: "Hard",
    rows: 30,
    cols: 16,
    fruits: 99,
  },
  extreme: {
    name: "Extreme",
    rows: 30,
    cols: 24,
    fruits: 160,
  },
};

class Cell {
  constructor() {
    this.isFruit = false;
    this.isClicked = false;
    this.isFlagged = false;
    this.isFindFruit = false;
    this.amountOfNeighbours = 0;
  }
}

let current_difficult = difficulties.easy;
let start = false;
let finish = false;
let field = [];

let unflaged = current_difficult.fruits;

function setDifficulty(new_difficulty) {
  current_difficult = new_difficulty;
  startGame();
}

function startGame() {
  createField();
  setFruits();
  updateField();
  unflaged = current_difficult.fruits;
}

function createField() {
  for (let i = 0; i < current_difficult.rows + 2; ++i) {
    field[i] = [];
    for (let j = 0; j < current_difficult.cols + 2; ++j) {
      field[i][j] = new Cell();
    }
  }
}

function setFruits() {
  let fruits = 0;
  while (fruits < current_difficult.fruits) {
    let row = 1 + Math.floor(Math.random() * current_difficult.rows);
    let col = 1 + Math.floor(Math.random() * current_difficult.cols);

    if (!field[row][col].isFruit) {
      field[row][col].isFruit = true;
      ++fruits;
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

          if (field[i + k][j + l].isFruit) {
            ++field[i][j].amountOfNeighbours;
          }
        }
      }
    }
  }
}
