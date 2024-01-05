import "./style.css";
import Game from "./index_modules/data/game/game";
import Display from "./index_modules/display/display";
import { randomCoord } from "./index_modules/utilities";

class GameController {
  constructor() {
    this.game = new Game();
    this.display = new Display(this.game);
    this.isRoundInProgress = false;
    this.winnerIsFound = false;
  }

  get currentRound() {
    return this.game.round;
  }

  get currentPlayer() {
    return this.game.players[this.game.turn];
  }

  init() {
    this.placeShips();
    this.display.addListeners(this.playRound, "#gameboard-Player2"); //add listener to enemy gameboard
    this.display.round(this.currentRound, this.currentPlayer);
  }

  placeShips() {
    //if is player
    const player = this.game.players[0];

    //ask if should place ships randomly or by hand
    const placementMode = this.display.getPlacementModeFromPrompt();

    if (placementMode === "") {
      player.placeShipsRand();
      this.display.ships(this.currentPlayer);
    } else {
      this.playerPlaceShipsFromPrompt(player);
    }

    //if is computer
    //display Ai player placed ships
    this.game.players[1].placeShipsRand();
  }

  playerPlaceShipsFromPrompt(player) {
    const ships = this.game.players[0].fleet;

    for (const ship of ships) {
      //display entry message

      let placed = false;

      while (!placed) {
        const coordinates = this.coordFromDOM(ship.length);
        const axis = this.axisFromDOM();

        placed = player.gameboard.place(ship, coordinates, axis);

        this.display.ships(this.currentPlayer);

        if (!placed) {
          this.display.invalidPlacement();
        }
      }
    }
  }

  coordFromDOM(l) {
    const coord = this.display.getCoordFromPrompt(l);
    return coord;
  }

  axisFromDOM() {
    const axis = this.display.getAxisFromPrompt();
    return axis;
  }

  playRound = (e) => {
    if (
      !this.isCellElement(e) ||
      this.isRoundInProgress ||
      this.winnerIsFound
    ) {
      return;
    }

    this.isRoundInProgress = true;

    const coord = this.display.getCoordFromCell(e.target);
    const gameboardEl = e.target.parentElement;
    const enemyIndex = this.display.getEnemyIndexFromCell(gameboardEl) - 1;

    // Current player attack
    this.playerAction(enemyIndex, coord);

    // Computer attack after a delay
    if (this.game.turn === 1) {
      setTimeout(() => {
        this.computerAction();
        this.isRoundInProgress = false;
      }, 1000);
    }
  };

  playerAction(enemyIndex, coord) {
    if (this.checkForWinner()) {
      return;
    }

    const enemy = this.game.players[enemyIndex];
    const player = this.currentPlayer;

    if (!player.attack(enemy, coord)) {
      console.error(`Can't attack the same coordinates twice.`);
    }

    this.display.attack(player, enemy, coord);

    this.game.nextRound();
    this.display.round(this.currentRound, this.currentPlayer);
  }

  computerAction() {
    if (this.checkForWinner()) {
      return;
    }

    const enemy = this.game.players[0];
    const player = this.game.players[1];

    let successfulAttack = false;

    while (!successfulAttack) {
      const coord = randomCoord();
      successfulAttack = player.attack(enemy, coord);

      if (successfulAttack) {
        this.display.attack(player, enemy, coord);
      }
    }

    this.game.nextRound();
    this.display.round(this.currentRound, this.currentPlayer);
  }

  checkForWinner() {
    if (this.game.isWinner(this.currentPlayer)) {
      this.display.winner(this.currentPlayer);
      this.winnerIsFound = true;
      return true;
    }
    return false;
  }

  isCellElement(e) {
    return e.target && e.target.classList.contains("cell");
  }
}

window.gameController = new GameController();
gameController.init();
