import Phaser from "phaser";
import type Server from "../services/Server";
import ITicTacToeState from "../../../types/ITicTacToeState";

export default class Game extends Phaser.Scene {
  private server?: Server;

  constructor() {
    super("game");
  }

  async create(data: { server: Server }) {
    const { server } = data;

    this.server = server;

    if (!this.server) {
      throw new Error("server instance missing");
    }

    await server.join();

    server.onceStateChanged(this.createBoard, this);
  }

  private createBoard(state: ITicTacToeState) {
    const { width, height } = this.scale;
    const cellSize = 128;
    const cellGap = 5;

    let x = width * 0.5 - cellSize - cellGap;
    let y = height * 0.5 - cellSize - cellGap;
    state.board.forEach((cellState, idx) => {
      this.add
        .rectangle(x, y, cellSize, cellSize, 0xffffff)
        .setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
          this.server?.makeSelection(idx);
        });

      if ((idx + 1) % 3 === 0) {
        y += cellSize + cellGap;
        x = width * 0.5 - cellSize - cellGap;
      } else {
        x += cellSize + cellGap;
      }
    });
  }
}
