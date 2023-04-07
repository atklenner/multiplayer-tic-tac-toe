import { useState } from "react";
import "./App.css";
import Modal from "./components/Modal";
import phaserGame from "./PhaserGame";
import Bootstrap from "./scenes/Bootstrap";

function App() {
  const [viewModal, setViewModal] = useState(true);
  const handleClick = () => {
    const scene = phaserGame.scene.keys.bootstrap as Bootstrap;
    setViewModal(false);
    scene.createNewGame();
  };
  return (
    <div className="App">
      {viewModal && <Modal handleClick={handleClick} />}
    </div>
  );
}

export default App;
