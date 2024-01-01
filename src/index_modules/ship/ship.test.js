import Ship from "./ship";

describe("Ship class", () => {
  test("hit() should increase the number of hits", () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.damage).toBe(1);
  });

  test("isSunk() should calculate whether the ship is sunk", () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();

    expect(ship.isSunk).toBe(true);
  });
});
