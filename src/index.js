import Player from "./index_modules/data/player/player";
import Display from "./index_modules/display/display";
import { matchCoord } from "./index_modules/utilities";

class Game {
  createPlayers(numPlayers = 2) {
    this.players = Array.from({ length: numPlayers }, () => new Player());
    return this.players;
  }
}

class GameController {
  constructor() {
    this.game = new Game();
    this.players = null;
    this.display = null;

    this.handleClick = this.handleClick.bind(this);
  }

  init() {
    this.players = this.game.createPlayers();

    this.display = new Display(this.game);
    this.display.addListeners(this.handleClick);

    this.players.forEach((player) => player.placeShipsRand());
  }

  handleClick(e) {
    const cellElId = e.srcElement.id;
    const boardElId = e.srcElement.parentElement.id;

    const coord = parseCoord(cellElId);
    const index = parseBoardIndex(boardElId);

    const player = this.players[index];

    if (isCellElement(e)) this.handleCellClick(coord, player);
  }

  handleCellClick(coord, player) {
    let isEmpty = false;

    if (!matchCoord(coord, player.gameboard.empty)) {
      let isMargin = false;
      let isSpace = false;

      for (const ship of player.gameboard.occupied) {
        if (matchCoord(coord, ship.margin)) {
          console.log("margin"); //remove later
          isMargin = true;
        } else if (matchCoord(coord, ship.space)) {
          console.log("space"); //remove later
          isSpace = true;
        }
      }

      if (!isMargin && !isSpace) {
        throw new Error("Unexpected coordinate state");
      }
    } else {
      console.log("empty"); //remove later
      isEmpty = true;
    }
  }
}

function parseCoord(cellElId) {
  return cellElId.split("-").map(Number);
}

function parseBoardIndex(boardElId) {
  return parseInt(boardElId.split("-")[1]);
}

function isCellElement(e) {
  return e.target.classList.contains("cell");
}

const gameController = new GameController();
gameController.init();
