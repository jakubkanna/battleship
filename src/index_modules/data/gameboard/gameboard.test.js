import Gameboard from "./gameboard";
import Ship from "../ship/ship";

describe("Gameboard class", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test("generate empty space", () => {
    expect(gameboard.empty.length).toBe(100);
    // console.log(gameboard.empty);
  });

  describe("Gameboard class ships", () => {
    beforeEach(() => {
      gameboard = new Gameboard();
    });

    test("place single ship", () => {
      const carrier = new Ship(5);
      const coordinates = [2, 2];
      gameboard.place(carrier, coordinates, "x");
      expect(gameboard.occupied.length).toBe(1);
      expect(carrier.length).toBe(5);

      expect(gameboard.empty.length).toBe(100 - 16 - 5);
    });

    test("has correct margin and space", () => {
      // Add test cases for placing multiple ships
      const ship = new Ship(4);
      gameboard.place(ship, [4, 2], "y");

      expect(gameboard.occupied[0].space.length).toBe(4);

      expect(ship.margin.length).toBe(4 + 4 + 3 + 3);

      expect(gameboard.empty.length).toBe(100 - (4 + 4 + 4 + 3 + 3));
    });

    test("has correct margin ", () => {
      const ship = new Ship(5);

      gameboard.place(ship, [1, 3], "x");

      expect(ship.margin.length).toBe(5 + 5 + 3 + 3);
    });
  });
});
