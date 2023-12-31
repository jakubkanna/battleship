import { matchCoord } from "../../utilities";

export default class Ship {
  constructor(length) {
    this.length = length;
    this.damage = 0;
    this.space = [];
    this.margin = [];
  }

  hit() {
    this.damage++;
  }

  get isSunk() {
    return this.damage === this.length;
  }

  isFound(coordinates) {
    return matchCoord(coordinates, this.space);
  }

  isMargin(coordinates) {
    return matchCoord(coordinates, this.margin);
  }
}
