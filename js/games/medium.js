import { setDifficulty, difficulties } from "../game.js";

window.addEventListener("load", () => {
  setDifficulty(difficulties.medium);
});
