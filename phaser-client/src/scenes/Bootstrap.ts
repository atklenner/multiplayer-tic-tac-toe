import Phaser from "phaser";
import Server from "../services/Server";
import { IGameOverSceneData } from "../../../types/scenes";

export default class Bootstrap extends Phaser.Scene {
  private server!: Server;

  constructor() {
    super("bootstrap");
  }

  init() {
    this.server = new Server();
  }

  create() {
    this.createNewGame();
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

  private createNewGame() {
    this.scene.launch("game", {
      // pass the server created when Bootstrap is init-ed to Game
      server: this.server,
      onGameOver: this.handleGameOver,
    });
  }
}
