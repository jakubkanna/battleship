import Gameboard from "./gameboard";
import Ship from "../ship/ship";

describe("Gameboard class", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test("generate empty space", () => {
    expect(gameboard.empty.length).toBe(100);
  });

  describe("Gameboard class ships", () => {
    beforeEach(() => {
      gameboard = new Gameboard();
    });

    const carrier = new Ship(5);
    const coordinates = [2, 2];

    test("place single ship", () => {
      gameboard.place(carrier, coordinates, "x");
      expect(gameboard.occupied.length).toBe(1);
      expect(gameboard.empty.length).toBe(79);
    });

    test("place multiple ships", () => {
      // Add test cases for placing multiple ships
    });
  });
});
