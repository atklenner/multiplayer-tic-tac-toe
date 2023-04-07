import "./App.css";
import phaserGame from "./PhaserGame";
import Bootstrap from "./scenes/Bootstrap";

const handleClick = () => {
  const scene = phaserGame.scene.keys.bootstrap as Bootstrap;
  scene.increaseSpeed();
};

function App() {
  return (
    <div className="App">
      <div className="modal">
        <h1>Let's Play a Game!</h1>
        <button onClick={handleClick}>Tic-Tac-Toe</button>
        <button>Uno</button>
        <button>Create a Room</button>
      </div>
    </div>
  );
}

export default App;
