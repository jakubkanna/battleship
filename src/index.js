import Game from "./index_modules/data/game/game";
import Display from "./index_modules/display/display";
import { randomCoord } from "./index_modules/utilities";

class GameController {
  constructor() {
    this.game = new Game();
    this.display = new Display(this.game);
    this.game.players.forEach((player) => player.placeShipsRand());
  }

  get currentRound() {
    return this.game.round;
  }

  get currentPlayer() {
    return this.game.players[this.game.turn];
  }

  init() {
    this.isRoundInProgress = false;
    this.display.addListeners(this.playRound, 1);
    this.display.displayRound(this.currentRound, this.currentPlayer);
  }

  playRound = (e) => {
    if (!isCellElement(e) || this.isRoundInProgress) return;

    this.isRoundInProgress = true;

    const coord = this.display.getCoordFromCell(e.srcElement);
    const gameboardEl = e.srcElement.parentElement;
    const enemyIndex = this.display.getEnemyIndexFromCell(gameboardEl);

    // Current player attack
    this.playerAction(enemyIndex, coord);

    // Computer attack after a delay
    setTimeout(() => {
      this.computerAction();
      this.isRoundInProgress = false;
    }, 2000);
  };

  playerAction(enemyIndex, coord) {
    const enemy = this.game.players[enemyIndex];
    const player = this.currentPlayer;

    if (!player.attack(enemy, coord)) {
      console.error(`Can't attack the same coordinates twice.`);
      return false;
    }

    this.display.displayAttack(player, enemy);

    this.game.nextRound();
    this.display.displayRound(this.currentRound, this.currentPlayer);

    return true;
  }

  computerAction() {
    if (this.game.turn === 1) {
      const enemy = this.game.players[0];
      const player = this.game.players[1];

      let successfulAttack = false;

      while (!successfulAttack) {
        successfulAttack = player.attack(enemy, randomCoord());

        if (successfulAttack) this.display.displayAttack(player, enemy);
      }

      this.game.nextRound();
      this.display.displayRound(this.currentRound, this.currentPlayer);
    }
  }
}

function isCellElement(e) {
  return e.target.classList.contains("cell");
}

window.gameController = new GameController();
gameController.init();
