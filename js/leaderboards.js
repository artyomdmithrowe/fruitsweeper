import {
  sortResultBy3BV,
  sortResultBy3BVperSecond,
  sortResultByEfficiency,
  sortResultByTime,
} from "./leaderboards_helper.js";

const ITEMS_PER_PAGE = 10;
const TOTAL_PAGES = 10;

let current_pages = TOTAL_PAGES;
let currentSort = "time";

async function getLeaderboards() {
  const response = await fetch("../api/results", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

function sortData(data, criteria) {
  return data.sort((a, b) => {
    switch (criteria) {
      case "time":
        return sortResultByTime(a, b);
      case "efficiency":
        return sortResultByEfficiency(a, b);
      case "3BV":
        return sortResultBy3BV(a, b);
      case "3BV/s":
        return sortResultBy3BVperSecond(a, b);
      default:
        return 0;
    }
  });
}

async function initLeaderboards() {
  try {
    const rawData = await getLeaderboards();
    const sortSelect = document.getElementById("sortCriteria");

    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      const sortedData = sortData([...rawData], currentSort);
      renderTable(sortedData, 1);
      setupPagination(sortedData);
    });

    const initialData = sortData(rawData, currentSort);
    current_pages = Math.min(
      TOTAL_PAGES,
      Math.floor(1 + (initialData.length - 1) / ITEMS_PER_PAGE)
    );

    document.querySelector(".loading").style.display = "none";
    document.getElementById("leaderboardsTable").style.display = "table";

    renderTable(initialData, 1);
    setupPagination(initialData);
  } catch (error) {
    document.querySelector(".loading").textContent = "Error loading data!";
  }
}

function renderTable(data, page) {
  let start = (page - 1) * ITEMS_PER_PAGE;
  let end = start + ITEMS_PER_PAGE;
  let paginatedData = data.slice(start, end);

  let table_body = document.getElementById("tableBody");
  table_body.innerHTML = "";

  let rank = start + 1;
  paginatedData.forEach((item) => {
    let row = document.createElement("tr");
    row.classList.add("game-position");
    row.innerHTML = `
            <td class="game-cell">${rank}</td>
            <td class="game-cell">${item.username}</td>
            <td class="game-cell">${item.time}</td>
            <td class="game-cell">${item.level}</td>
            <td class="game-cell">${item.field_difficulty}</td>
            <td class="game-cell">${item.efficiency.toFixed(2)}</td>
            <td class="game-cell">${item.date}</td>
        `;
    table_body.appendChild(row);
    ++rank;
  });
}

function setupPagination(data) {
  let pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= current_pages; i++) {
    let button = document.createElement("button");
    button.className = "page-button";
    button.textContent = i;
    button.addEventListener("click", () => {
      document
        .querySelectorAll(".page-button")
        .forEach((b) => b.classList.remove("active"));
      button.classList.add("active");
      renderTable(data, i);
    });

    if (i === 1) button.classList.add("active");
    pagination.appendChild(button);
  }
}

document.addEventListener("DOMContentLoaded", initLeaderboards);
