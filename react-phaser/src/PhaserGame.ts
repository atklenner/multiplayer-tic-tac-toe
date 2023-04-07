import Phaser from "phaser";

import Bootstrap from "./scenes/Bootstrap";
import TicTacToeGame from "./scenes/TicTacToeGame";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "phaser-container",
  backgroundColor: "#000000",
  scale: {
    mode: Phaser.Scale.ScaleModes.RESIZE,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scene: [Bootstrap, TicTacToeGame],
};

export default new Phaser.Game(config);
