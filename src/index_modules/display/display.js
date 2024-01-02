export default class Display {
  constructor(game) {
    this.game = game;
    this.containers = this.renderBoards();
  }

  renderHeaders() {}

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

  addListeners(cb) {
    for (const container of this.containers)
      container.addEventListener("click", cb);
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
