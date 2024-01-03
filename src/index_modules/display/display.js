export default class Display {
  constructor(game) {
    this.game = game;
    this.containers = this.renderBoards();
  }

  renderBoards() {
    console.log(this.game);
    const containers = [];

    this.game.players.forEach((player, i) => {
      const container = generateGameBoard(i);
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
    const match = id.match(/gameboard-(\d+)/);

    if (match && match[1]) {
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
    console.log(`Round: ${nb}, ${player.name} turn.`);
  }

  displayAttack(player, enemy) {
    console.log(`${player.name} attacks ${enemy.name}.`);
  }
  // removeListeners(cb) {
  //   this.containers.forEach((container) => {
  //     container.removeEventListener("click", cb);
  //   });
  // }

  // discoverShip(gameboardID, elementID) {
  //   const el = document.querySelector(`#${gameboardID} [id="${elementID}"]`);
  //   el.classList.add("ship");
  // }

  // discoverEmpty(gameboardID, elementID) {
  //   const el = document.querySelector(`#${gameboardID} [id="${elementID}"]`);
  //   el.classList.add("empty");
  // }

  //   setActiveBorder(gameboardID) {
  //     const gameboardElement = document.getElementById(gameboardID);
  //     const otherGameboardsElements = document.querySelectorAll(
  //       `[id^=gameboard]:not([id=${gameboardID}])`
  //     );

  //     if (gameboardElement) {
  //       // Set the border style for the active gameboard
  //       gameboardElement.style.border = "2px solid"; // Adjust the style as needed
  //     } else {
  //       console.error(`Element with ID ${gameboardID} not found.`);
  //       return;
  //     }

  //     // Set dashed border for other gameboards
  //     otherGameboardsElements.forEach((element) => {
  //       if (element !== gameboardElement) {
  //         element.style.border = "1px dashed"; // Adjust the style as needed
  //       }
  //     });
  //   }
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
