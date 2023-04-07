import Phaser from "phaser";

export default class Bootstrap extends Phaser.Scene {
  constructor() {
    super("bootstrap");
  }

  create() {
    this.scene.launch("starfield");
  }

  createNewGame() {
    this.scene.launch("tic-tac-toe-game");
  }
}
