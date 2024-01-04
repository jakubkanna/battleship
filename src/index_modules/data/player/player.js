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
    this.name;
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

  attack(enemy, coord) {
    if (this.alreadyAttacked(coord)) return false; // Unsuccessful attack

    // Check if the coordinate is not empty
    if (!enemy.isCoordEmpty(coord)) {
      for (const ship of enemy.gameboard.occupied) {
        if (ship.isFound(coord)) {
          ship.hit();
          this.onTargetShots.push(coord);

          if (ship.isSunk) {
            this.onTargetShots.push(...ship.margin, ...ship.space);
          }
        } else if (ship.isMargin(coord)) {
          this.missedShots.push(coord);
        }
      }
    } else {
      this.missedShots.push(coord);
    }

    return true; // Successful attack
  }

  isCoordEmpty(coord) {
    return matchCoord(coord, this.gameboard.empty);
  }

  alreadyAttacked(coord) {
    return matchCoord(coord, [...this.missedShots, ...this.onTargetShots]);
  }
}
