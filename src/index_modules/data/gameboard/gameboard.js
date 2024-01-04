import { matchCoord } from "../../utilities";

export default class Gameboard {
  constructor() {
    this.occupied = [];
    this.empty = this.generatedBoard;
  }

  get generatedBoard() {
    const board = [];

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        board.push([j, i]);
      }
    }

    return board;
  }

  place(ship, startCoord, axis) {
    const space = generateShipSpace(ship, startCoord, axis);
    const area = generateShipArea(ship, startCoord, axis);

    if (!space) return false;

    if (this.findSpace(space)) {
      const margin = filterOutSpace(space, area); //filter out ship from area
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

function generateShipSpace(ship, coord, axis) {
  const space = [];
  const [startX, startY] = coord;

  if (axis === "x") {
    for (let i = 0; i < ship.length; i++) {
      const x = i + startX;
      const y = startY;

      // Check if x or y is outside the valid range (0 to 9)
      if (x < 0 || x > 9 || y < 0 || y > 9) {
        return false; // Return false if outside the valid range
      }

      space.push([x, y]);
    }
  } else if (axis === "y") {
    for (let i = 0; i < ship.length; i++) {
      const x = startX;
      const y = i + startY;

      // Check if x or y is outside the valid range (0 to 9)
      if (x < 0 || x > 9 || y < 0 || y > 9) {
        return false; // Return false if outside the valid range
      }

      space.push([x, y]);
    }
  } else {
    console.error("axis must be x or y");
  }

  return space;
}

function generateShipArea(ship, coord, axis) {
  const margin = [];
  const [startX, startY] = coord;

  if (axis === "y") {
    for (let i = startX - 1; i <= startX + 1; i++) {
      for (let j = startY - 1; j <= startY + ship.length; j++) {
        // Check if i is within the valid range (0 to 9)
        if (i >= 0 && i <= 9) {
          // Check if j is within the valid range (0 to 9)
          if (j >= 0 && j <= 9) {
            margin.push([i, j]);
          }
        }
      }
    }
  } else {
    for (let i = startX - 1; i <= startX + ship.length; i++) {
      for (let j = startY - 1; j <= startY + 1; j++) {
        // Check if i is within the valid range (0 to 9)
        if (i >= 0 && i <= 9) {
          // Check if j is within the valid range (0 to 9)
          if (j >= 0 && j <= 9) {
            margin.push([i, j]);
          }
        }
      }
    }
  }

  return margin;
}

function filterOutSpace(space, area) {
  // create a new array with elements not present in space
  const filteredArea = area.filter(
    (coord) =>
      !space.some(
        (spaceCoord) => spaceCoord[0] === coord[0] && spaceCoord[1] === coord[1]
      )
  );

  return filteredArea;
}
