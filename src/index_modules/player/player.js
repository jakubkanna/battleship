import Gameboard from "../gameboard/gameboard";
import Ship from "../ship/ship";

export default class Player {
  constructor() {
    this.gameboard = new Gameboard();
    this.ships = this.fleet;
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
    const queue = [...this.ships]; // Clone the array

    for (const current of queue) {
      let placed = false;

      while (!placed) {
        const coord = this.randomCoord;
        const axis = this.randomAxis;
        placed = this.gameboard.place(current, coord, axis);
      }
    }

    return true;
  }
}
