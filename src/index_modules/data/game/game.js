import Player from "../player/player";

export default class Game {
  constructor(playerNumber = 2) {
    this._players = this.createPlayers(playerNumber);
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

  createPlayers(playerNumber) {
    return Array.from({ length: playerNumber }, () => new Player());
  }

  setPlayerNames() {
    this._players = this._players.map((player, i) => {
      const newPlayer = new Player();
      newPlayer.name = "Player" + (i + 1);
      return newPlayer;
    });
  }

  nextRound() {
    this.round++;
    this._turn = (this._turn + 1) % this._players.length;
  }

  static areAllShipsSunk(player) {
    return player.gameboard.occupied.every((ship) => ship.isSunk);
  }

  isWinner(current) {
    return this._players.some(
      (player) => player !== current && Game.areAllShipsSunk(player)
    );
  }
}
