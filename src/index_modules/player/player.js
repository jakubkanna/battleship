import Gameboard from "../gameboard/gameboard";
import Ship from "../ship/ship";
import { matchCoord } from "../utilities";

export default class Player {
  constructor() {
    this.gameboard = new Gameboard();
    this.ships = this.fleet;
    this.onTargetShots = [];
    this.missedShots = [];
  }

  get fleet() {
    const carrier = new Ship(5);
    const battleship = new Ship(4);
    const cruiser = new Ship(3);
    const submarine = new Ship(3);
    const destroyer = new Ship(2);

    return [carrier, battleship, cruiser, submarine, destroyer];
  }

  get randomCoord() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return [x, y];
  }

  get randomAxis() {
    const axis = ["x", "y"];
    const randomIndex = Math.floor(Math.random() * axis.length);
    return axis[randomIndex];
  }

  placeShipsRand() {
    const queue = [...this.ships];

    for (const current of queue) {
      let placed = false;

      while (!placed) {
        const coord = this.randomCoord;
        const axis = this.randomAxis;
        placed = this.gameboard.place(current, coord, axis);
      }
    }
  }

  isCoordEmpty(coord) {
    return matchCoord(coord, this.gameboard.empty);
  }

  attack(enemy, coord) {
    if (!enemy.isCoordEmpty(coord)) {
      for (const ship of enemy.ships) {
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
