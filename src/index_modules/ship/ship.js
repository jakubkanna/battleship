export default class Ship {
  constructor(length) {
    this.length = length;
    this.damage = 0;
    this.space = [];
    this.margin = [];
  }

  hit() {
    return this.damage++;
  }

  get isSunk() {
    return this.damage === this.length;
  }
}
