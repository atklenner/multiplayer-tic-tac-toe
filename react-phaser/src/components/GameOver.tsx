import reactStore from "../services/zustand";
import phaserGame from "../PhaserGame";
import Bootstrap from "../scenes/Bootstrap";

export default function GameOver() {
  const { toggleGameOver, togglePickGame } = reactStore();
  const handlePlayAgain = () => {
    const scene = phaserGame.scene.keys.bootstrap as Bootstrap;
    scene.handleRestart();
    toggleGameOver();
  };
  const handleDifGame = () => {
    toggleGameOver();
    togglePickGame();
  };
  return (
    <>
      <h1>You lost, or won, whatever...</h1>
      <button onClick={handlePlayAgain}>Play Again?</button>
      <button onClick={handleDifGame}>Pick a Different Game</button>
    </>
  );
}
