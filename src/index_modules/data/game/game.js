import Player from "../player/player";

export default class Game {
  constructor(pNum) {
    this._players = this.createPlayers(pNum);
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

  playRound() {
    const current = this.players[this.turn];

    if (this.isWinner(current)) {
      return current.name;
    } else {
      this.round++;
      this.turn++;
    }
  }

  set turn(value) {
    this._turn = value % this.players.length;
  }

  isWinner(current) {
    // For each player (other than the current player):
    // If all ships of the current player are sunk:
    //   Return true
    // Otherwise:
    //   Return false
  }
}
