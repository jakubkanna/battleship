import Player from "./player";

describe("Player class", () => {
  const player = new Player();

  describe("Player class init", () => {
    test("generates random coord", () => {
      const [x, y] = player.randomCoord;

      // Check if x and y are within the expected range
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThan(10);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThan(10);
    });

    test("generates 'x' or 'y' randomly", () => {
      const axis = player.randomAxis;

      expect(axis == "x" || axis == "y").toBe(true);
    });

    test("places ships", () => {
      const placementSuccess = player.placeShipsRand();
      expect(placementSuccess).toBe(true);
      expect(player.gameboard.sea.length).toBe(5);
    });
  });
});
