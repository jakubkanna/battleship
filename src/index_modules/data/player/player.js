import Gameboard from "../gameboard/gameboard";
import Ship from "../ship/ship";
import { matchCoord, randomAxis, randomCoord } from "../../utilities";

export default class Player {
  static get fleet() {
    const carrier = new Ship(5);
    const battleship = new Ship(4);
    const cruiser = new Ship(3);
    const submarine = new Ship(3);
    const destroyer = new Ship(2);

    return [carrier, battleship, cruiser, submarine, destroyer];
  }

  constructor() {
    this.gameboard = new Gameboard();
    this.onTargetShots = [];
    this.missedShots = [];
  }

  placeShipsRand() {
    const queue = [...Player.fleet];

    for (const current of queue) {
      let placed = false;

      while (!placed) {
        const coord = randomCoord();
        const axis = randomAxis();
        placed = this.gameboard.place(current, coord, axis);
      }
    }
  }

  isCoordEmpty(coord) {
    return matchCoord(coord, this.gameboard.empty);
  }

  attack(enemy, coord) {
    if (!enemy.isCoordEmpty(coord)) {
      for (const ship of enemy.gameboard.occupied) {
        if (ship.isFound(coord)) {
          ship.hit(); // if coord is not empty, determine which ship is there and damage it
          this.onTargetShots.push(coord);
        }
      }
    } else {
      this.missedShots.push(coord);
    }
  }

  alreadyTargeted(coord) {
    return matchCoord(coord, this.onTargetShots + this.missedShots);
  }
}
