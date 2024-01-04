import { matchCoord } from "../../utilities";

export default class Gameboard {
  constructor() {
    this.occupied = [];
    this.empty = Gameboard.generatedBoard;
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

  static generateShipSpace(ship, coord, axis) {
    const [startX, startY] = coord;
    const space = [];

    for (let i = 0; i < ship.length; i++) {
      const x = axis === "x" ? i + startX : startX;
      const y = axis === "y" ? i + startY : startY;

      if (!(0 <= x <= 9 && 0 <= y <= 9)) {
        return false;
      }

      space.push([x, y]);
    }

    return space;
  }

  static generateShipArea(ship, coord, axis) {
    const [startX, startY] = coord;
    const margin = [];

    const loopLimitX = axis === "y" ? startX + 1 : startX + ship.length;
    const loopLimitY = axis === "x" ? startY + 1 : startY + ship.length;

    for (let i = startX - 1; i <= loopLimitX; i++) {
      for (let j = startY - 1; j <= loopLimitY; j++) {
        if (0 <= i && i <= 9 && 0 <= j && j <= 9) {
          margin.push([i, j]);
        }
      }
    }

    return margin;
  }

  static filterOutSpace(space, area) {
    return area.every(
      (coord) =>
        !space.some(
          (spaceCoord) =>
            spaceCoord[0] === coord[0] && spaceCoord[1] === coord[1]
        )
    );
  }

  place(ship, startCoord, axis) {
    const space = Gameboard.generateShipSpace(ship, startCoord, axis);
    const area = Gameboard.generateShipArea(ship, startCoord, axis);

    if (!space) return false;

    if (this.findSpace(space)) {
      const margin = Gameboard.filterOutSpace(space, area); //filter out ship from area
      this.launchShip(ship, space, margin);

      this.reduceEmptySpace(area); // Filter out elements from 'empty' that match elements in shipArea

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
