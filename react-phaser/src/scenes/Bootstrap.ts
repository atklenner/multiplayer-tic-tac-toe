import Phaser from "phaser";
import TicTacToeServer from "../services/TicTacToeServer";
import { IGameOverSceneData } from "../../../types/scenes";

export default class Bootstrap extends Phaser.Scene {
  private toggleGameOver: () => void;
  private server!: TicTacToeServer;
  private currentGame: string = "";

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
    this.scene.stop(this.currentGame);
    this.scene.launch("starfield");
    this.toggleGameOver();
  };

  handleRestart = () => {
    this.scene.stop("starfield");
    this.scene.launch(this.currentGame, {
      server: this.server,
      onGameOver: this.handleGameOver,
    });
  };

  createNewGame(gameId: string, toggleGameOver: () => void) {
    this.toggleGameOver = toggleGameOver;
    this.currentGame = gameId;
    this.scene.stop("starfield");
    this.scene.launch(gameId, {
      server: this.server,
      onGameOver: this.handleGameOver,
    });
  }
}
