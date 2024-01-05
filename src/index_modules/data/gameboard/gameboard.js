import { matchCoord } from "../../utilities";

export default class Gameboard {
  constructor() {
    this.occupied = [];
    this.empty = Gameboard.generatedBoard;
  }

  static generateShipSpace(ship, coord, axis) {
    const space = [];
    const [startX, startY] = coord;

    const getCoordinates = (i, j) => {
      const x = axis === "x" ? i + startX : startX;
      const y = axis === "y" ? i + startY : startY;
      return [x, y];
    };

    for (let i = 0; i < ship.length; i++) {
      const [x, y] = getCoordinates(i, i);

      // Check if x or y is outside the valid range (0 to 9)
      if (!this.isValidRange(x, y)) {
        return false; // Return false if outside the valid range
      }

      space.push([x, y]);
    }

    return space;
  }

  static isValidRange(x, y) {
    return x >= 0 && x <= 9 && y >= 0 && y <= 9;
  }

  static generateShipArea(ship, coord, axis) {
    const margin = [];
    const [startX, startY] = coord;

    const limitX = axis === "y" ? startX + 1 : startX + ship.length;
    const limitY = axis === "x" ? startY + 1 : startY + ship.length;

    for (let i = startX - 1; i <= limitX; i++) {
      for (let j = startY - 1; j <= limitY; j++) {
        // Check if i and j are within the valid range (0 to 9)
        if (this.isValidRange(i, j)) {
          margin.push([i, j]);
        }
      }
    }

    return margin;
  }

  static get generatedBoard() {
    const board = [];

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        board.push([j, i]);
      }
    }

    return board;
  }

  static filterOutSpace(space, area) {
    // create a new array with elements not present in space
    const filteredArea = area.filter(
      (coord) =>
        !space.some(
          (spaceCoord) =>
            spaceCoord[0] === coord[0] && spaceCoord[1] === coord[1]
        )
    );

    return filteredArea;
  }

  place(ship, startCoord, axis) {
    const space = Gameboard.generateShipSpace(ship, startCoord, axis);
    const area = Gameboard.generateShipArea(ship, startCoord, axis);

    if (!space) return false;

    if (this.findSpace(space)) {
      const margin = Gameboard.filterOutSpace(space, area); //filter out ship from area
      this.launchShip(ship, space, margin);

      // Filter out elements from 'empty' that match elements in shipArea
      this.reduceEmptySpace(area);

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

  launchShip(ship, space, margin) {
    ship.space = space;
    ship.margin = margin;

    this.occupied.push(ship);
  }

  reduceEmptySpace(shipArea) {
    this.empty = this.empty.filter(
      (coord) =>
        !shipArea.some(
          (areaCoord) => areaCoord[0] === coord[0] && areaCoord[1] === coord[1]
        )
    );
  }
}
