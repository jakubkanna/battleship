export default class Gameboard {
  constructor() {
    this.sea = [];
    this.empty = this.generatedBoard;
  }
  get generatedBoard() {
    const board = [];

    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push([i, j]);
      }
      board.push(...row);
    }

    return board;
  }

  place(ship, coordinates, axis) {
    const [space, margin] = this.calculateShipArea(ship, coordinates, axis);

    //  if 'space' is not occupied
    if (this.findSpace(space)) {
      this.launchShip(ship, space, margin);

      // Filter out elements from 'empty' that match elements in shipArea
      this.reduceEmptySpace([...space, ...margin]);

      return true;
    } else {
      return false;
    }
  }

  findSpace(space) {
    return space.every((coord) =>
      this.empty.some(
        (emptyCoord) => emptyCoord[0] === coord[0] && emptyCoord[1] === coord[1]
      )
    );
  }

  calculateShipArea(ship, coord, axis) {
    const [startX, startY] = coord;

    const space = [];
    let margin = [];

    // Generate the array of coordinates representing the positions occupied by the ship on the game board
    for (let i = 0; i < ship.length; i++) {
      const x = startX + (axis === "x" ? i : 0);
      const y = startY + (axis === "y" ? i : 0);
      space.push([x, y]);
    }

    // Generate margin with a width of 1 unit around the ship.
    for (let i = startX - 1; i <= startX + ship.length; i++) {
      for (let j = startY - 1; j <= startY + 1; j++) {
        margin.push([i, j]);
      }
    }

    margin = margin.filter(
      (coord) => !space.some((p) => p[0] === coord[0] && p[1] === coord[1]) // Filter out the ship position.
    );

    return [space, margin];
  }

  launchShip(ship, space, margin) {
    ship.space = space;
    ship.margin = margin;

    this.sea.push(ship);
  }

  reduceEmptySpace(shipArea) {
    this.empty = this.empty.filter(
      (coord) => !shipArea.some((p) => p[0] === coord[0] && p[1] === coord[1])
    );
  }
}
