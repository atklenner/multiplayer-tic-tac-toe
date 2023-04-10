import Bootstrap from "../scenes/Bootstrap";
import reactStore from "../services/zustand";
import phaserGame from "../PhaserGame";

export default function PickAGame() {
  const { togglePickGame, toggleGameOver } = reactStore();
  const handleClick = (gameId: string) => {
    const scene = phaserGame.scene.keys.bootstrap as Bootstrap;
    scene.createNewGame(gameId, () => toggleGameOver());
    togglePickGame();
  };
  return (
    <>
      <h1>Let's Play a Game!</h1>
      <button onClick={() => handleClick("tic-tac-toe-game")}>
        Tic-Tac-Toe
      </button>
      <button>Uno</button>
      <button>Create a Room</button>
    </>
  );
}
