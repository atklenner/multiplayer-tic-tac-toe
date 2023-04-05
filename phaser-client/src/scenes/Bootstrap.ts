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
    this.scene.launch("game", {
      // pass the server created when Bootstrap is init-ed to Game
      server: this.server,
      onGameOver: (data: IGameOverSceneData) => {
        this.scene.stop("game");
        this.scene.launch("game-over", data);
      },
    });
  }
}
