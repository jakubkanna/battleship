export default class Display {
  constructor(game) {
    this.game = game;
    this.containers = this.renderBoards();
    this.messageBox = generateMessageBox();
  }

  renderBoards() {
    const containers = [];

    this.game.players.forEach((player) => {
      const container = generateGameBoard(player.name);
      const cells = generateCells(player.gameboard);

      appendGameBoard(container, cells);

      containers.push(container);
    });

    return containers;
  }

  getCoordFromCell(el) {
    const id = el.id;
    if (id) {
      const [x, y] = id.split("-").map(Number);
      return [x, y];
    } else {
      // Handle the case where the id is not present or not in the expected format
      console.error("Invalid or missing id for the cell element");
      return null;
    }
  }

  getEnemyIndexFromCell(el) {
    const id = el.id;
    const match = id.match(/gameboard-Player(\d+)/);

    if (match && match[1] !== undefined) {
      return parseInt(match[1], 10);
    } else {
      // Handle the case where the ID doesn't match the expected format
      console.error("Invalid or missing ID format for the element");
      return null;
    }
  }

  addListeners(cb, gbContainer) {
    this.containers[gbContainer].addEventListener("click", cb);
  }

  displayRound(nb, player) {
    const string = `Round ${nb}: ${player.name} turn.`;
    this.appendRoundMessage(string, "roundMessage");
  }

  displayAttack(player, enemy, coord) {
    const hitMessage = `${player.name}: hit ${enemy.name} ship at [${coord}].`;
    const missMessage = `${player.name}: miss.`;

    for (const shot of player.onTargetShots) {
      const targetEl = findEl(enemy, shot);
      targetEl.classList.add("hit");
    }

    for (const missed of player.missedShots) {
      const targetEl = findEl(enemy, missed);
      targetEl.classList.add("miss");
    }

    // Append the message outside of the loops
    if (player.onTargetShots.length > 0) {
      this.appendMessage(hitMessage, "hitMessage");
    } else if (player.missedShots.length > 0) {
      this.appendMessage(missMessage, "missMessage");
    }

    this.messageBox.scrollTop = this.messageBox.scrollHeight;
  }

  displayShips(player) {
    const ships = player.gameboard.occupied;

    for (const ship of ships) {
      for (const space of ship.space) {
        // Find element #${x}-${y} inside #gameboard-${player.name}
        const targetEl = findEl(player, space);

        if (targetEl) {
          // Set element class to "ship"
          targetEl.classList.add("ship");
        } else {
          console.error(`Element with selector ${elementSelector} not found.`);
        }
      }
    }
  }

  appendMessage(string, elClass = "message") {
    const para = document.createElement("p");
    para.classList.add(elClass);

    para.textContent = string;
    this.messageBox.append(para);
  }

  appendRoundMessage(string, elClass = "round") {
    const container = document.getElementById("roundBox");
    container.innerHTML = "";

    const para = document.createElement("p");
    para.classList.add(elClass);

    para.textContent = string;
    container.append(para);
  }
}

function appendGameBoard(container, cells) {
  cells.forEach((cell) => {
    container.appendChild(cell);
  });
}

function generateGameBoard(i) {
  const container = document.createElement("div");
  container.id = `gameboard-${i}`;

  const main = document.querySelector("main");
  main.appendChild(container);

  return container;
}

function generateMessageBox() {
  const container = document.createElement("div");
  container.id = `messageBox`;

  // Create roundBox element
  const roundBox = document.createElement("div");
  roundBox.id = "roundBox";

  // Append roundBox to container
  container.appendChild(roundBox);

  // Create and append hr element
  const hrElement = document.createElement("hr");
  container.appendChild(hrElement);

  const main = document.querySelector("main");
  main.appendChild(container);

  return container;
}

function generateCells(gameboard) {
  const emptyCells = gameboard.empty.map((element) => generateCell(element));

  return [...emptyCells];
}

function generateCell(element) {
  //class must contain object property name empty, margin or space
  const div = document.createElement("div");
  div.classList.add("cell");
  div.id = `${element[0]}-${element[1]}`;
  return div;
}

function findEl(player, coord) {
  const [x, y] = coord;
  // Find element #${x}-${y} inside #gameboard-${player.name}
  const elementSelector = `#gameboard-${player.name} [id="${x}-${y}"]`;
  return document.querySelector(elementSelector);
}
