import Gameboard from "../gameboard/gameboard";
import Ship from "../ship/ship";
import { matchCoord, randomAxis, randomCoord } from "../../utilities";

export default class Player {
  get fleet() {
    return [new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)];
  }

  constructor() {
    this.name;
    this.gameboard = new Gameboard();
    this.onTargetShots = [];
    this.missedShots = [];
  }

  placeShipsRand() {
    const queue = [...this.fleet];

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

    if (!this.handleAttackResult(enemy, coord)) {
      this.missedShots.push(coord);
    }

    return true; // Successful attack
  }

  handleAttackResult(enemy, coord) {
    if (!enemy.isCoordEmpty(coord)) {
      for (const ship of enemy.gameboard.occupied) {
        if (ship.isFound(coord)) {
          ship.hit();
          this.onTargetShots.push(coord);

          if (ship.isSunk) {
            this.onTargetShots.push(...ship.margin, ...ship.space);
          }

          return true; // Successfully attacked a ship
        } else if (ship.isMargin(coord)) {
          return false; // Attacked the margin of a ship
        }
      }
    }

    return false; // Attacked an empty coordinate
  }

  isCoordEmpty(coord) {
    return matchCoord(coord, this.gameboard.empty);
  }

  alreadyAttacked(coord) {
    return matchCoord(coord, [...this.missedShots, ...this.onTargetShots]);
  }
}
