export default class Ship {
  constructor(length) {
    this.length = this.validLength(length);
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
  validLength(length) {
    if (length >= 2 && length <= 5) {
      return parseInt(length);
    } else {
      throw new Error("Invalid length");
    }
  }
}
