import Phaser from "phaser";
import TicTacToeServer from "../services/TicTacToeServer";
import { IGameOverSceneData } from "../../../types/scenes";

export default class Bootstrap extends Phaser.Scene {
  private server!: TicTacToeServer;

  constructor() {
    super("bootstrap");
  }

  init() {
    this.server = new TicTacToeServer();
  }

  create() {
    this.scene.launch("starfield");
  }

  private handleGameOver = (data: IGameOverSceneData) => {
    this.server.leave();
    this.scene.stop("game");

    this.scene.launch("game-over", {
      ...data,
      onRestart: this.handleRestart,
    });
  };

  private handleRestart = () => {
    this.scene.stop("game-over");
    this.createNewGame();
  };

  createNewGame() {
    this.scene.stop("starfield");
    this.scene.launch("tic-tac-toe-game", {
      server: this.server,
      onGameOver: this.handleGameOver,
    });
  }
}
