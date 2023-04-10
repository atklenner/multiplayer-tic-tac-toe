import "./App.css";
import GameOver from "./components/GameOver";
import Login from "./components/Login";
import Modal from "./components/Modal";
import PickAGame from "./components/PickAGame";
import phaserGame from "./PhaserGame";
import Bootstrap from "./scenes/Bootstrap";
import reactStore from "./services/zustand";

function App() {
  const { login, pickGame, gameOver } = reactStore();
  return (
    <div className="App">
      {login && (
        <Modal>
          <Login />
        </Modal>
      )}
      {pickGame && (
        <Modal>
          <PickAGame />
        </Modal>
      )}
      {gameOver && (
        <Modal>
          <GameOver />
        </Modal>
      )}
    </div>
  );
}

export default App;
