import { setDifficulty, difficulties } from "../game.js";

window.addEventListener("DOMContentLoaded", () => {
  setDifficulty(difficulties.medium);

  document.querySelectorAll(".button").forEach((button) => {
    button.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });

    button.addEventListener("touchstart", (event) => {
      event.preventDefault();
    });
  });
});
