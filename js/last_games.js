const ITEMS_PER_PAGE = 10;
let TOTAL_PAGES = 10;

async function getGames() {
  let response = await fetch("../api/results", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let data = await response.json();
  return data;
}

async function initTable() {
  try {
    const data = await getGames();
    TOTAL_PAGES = Math.min(
      TOTAL_PAGES,
      Math.floor(1 + (data.length - 1) / ITEMS_PER_PAGE)
    );
    let sortedData = data.sort((a, b) => b.was_added - a.was_added);

    document.querySelector(".loading").style.display = "none";
    document.getElementById("gamesTable").style.display = "table";

    renderTable(sortedData, 1);
    setupPagination(sortedData);
  } catch (error) {
    console.log(error);
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

  for (let i = 1; i <= TOTAL_PAGES; i++) {
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

document.addEventListener("DOMContentLoaded", initTable);
