import Game from "./game";

describe("Game", () => {
  // Create a new game instance before each test
  let game;

  beforeEach(() => {
    game = new Game();
  });

  test("creates players", () => {
    // Test that the game instance creates players
    expect(game.players.length).toBe(2);
  });

  test("tracks rounds", () => {
    // Test that the game instance tracks rounds after playing a round
    game.nextRound();
    expect(game.round).toBe(2);
  });

  test("sets Player turn", () => {
    // Test that the initial turn is 0
    expect(game.turn).toBe(0);

    // Play a round and check if the turn is updated
    game.nextRound();
    expect(game.turn).toBe(1);

    // Play another round to wrap around to the first player
    game.nextRound();
    expect(game.turn).toBe(0);
  });

  test("check for the winner before next round", () => {
    // init players
    game.players[0].name = "Player";
    game.players[1].name = "Computer";

    game.players[0].placeShipsRand();
    const player0Ships = game.players[0].gameboard.occupied;

    // sink all the ships for Player
    for (const ship of player0Ships) ship.damage = ship.length;

    // Trigger the next round
    game.nextRound();

    // Computer is the winner
    expect(game.isWinner()).toBe(true);
  });
});
