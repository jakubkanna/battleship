import Player from "../player/player";

export default class Game {
  constructor(pNum) {
    this._players = this.createPlayers(pNum);
    this.setPlayerNames();

    this.round = 1;
    this._turn = 0;
    this.defeated = [];
  }

  get players() {
    return this._players;
  }

  get turn() {
    return this._turn;
  }

  createPlayers(playerNumber = 2) {
    return Array.from({ length: playerNumber }, () => new Player());
  }

  setPlayerNames() {
    this.players.forEach((player, i) => {
      player.name = "Player" + (i + 1);
    });
  }

  nextRound() {
    this.round++;
    this.turn++;
  }

  set turn(value) {
    this._turn = value % this.players.length;
  }

  isWinner() {
    const current = this.players[this.turn];
    for (const player of this.players) {
      if (player !== current && areAllShipsSunk(player)) {
        return current.name;
      }
    }
    return false;
  }
}

function areAllShipsSunk(player) {
  return player.gameboard.occupied.every((ship) => ship.isSunk);
}
