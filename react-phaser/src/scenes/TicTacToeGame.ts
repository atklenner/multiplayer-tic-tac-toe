import Phaser from "phaser";

export default class TicTacToeGame extends Phaser.Scene {
  constructor() {
    super("tic-tac-toe-game");
  }

  create() {
    this.add.rectangle(100, 100, 50, 50, 0xffffff);
  }
}
