import Player from "./player";
import Ship from "../ship/ship";
describe("Player class", () => {
  let player = new Player();
  beforeEach(() => {
    player = new Player();
  });

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
      player.placeShipsRand();
      expect(player.gameboard.sea.length).toBe(5);
    });
  });

  describe("Player class methods", () => {
    describe("attack", () => {
      test("evaluates if cell is empty", () => {
        // In this test, we assume that the ship of length 2 is placed at [2, 2] on the 'x' axis
        player.gameboard.place(new Ship(2), [2, 2], "x");

        // In case it's a miss
        expect(player.isCoordEmpty([5, 2])).toBe(true);

        // In case it's not a miss
        expect(player.isCoordEmpty([2, 2])).toBe(false);
      });

      test("player can attack enemy", () => {
        const enemy = new Player();

        // Place enemy ship at [2, 2] on the 'x' axis
        enemy.gameboard.place(enemy.ships[0], [2, 2], "x");

        // Attack the ship
        player.attack(enemy, [2, 2]);

        // Check if the damage to the ship has increased
        const damagedShip = enemy.gameboard.sea[0];
        // console.log(damagedShip);
        expect(damagedShip.damage).toBe(1);
      });
    });
  });
});
