import Phaser from "phaser";
import type Server from "../services/Server";
import ITicTacToeState, { Cell } from "../../../types/ITicTacToeState";

export default class Game extends Phaser.Scene {
  private server?: Server;
  private cells: { display: Phaser.GameObjects.Rectangle; value: Cell }[] = [];

  constructor() {
    super("game");
  }

  init() {
    this.cells = [];
  }

  async create(data: { server: Server }) {
    const { server } = data;

    this.server = server;

    if (!this.server) {
      throw new Error("server instance missing");
    }

    await server.join();

    server.onceStateChanged(this.createBoard, this);
    server.onBoardChanged(this.handleBoardChanged, this);
    server.onPlayerTurnChanged(this.handlePlayerTurnChanged, this);
  }

  private createBoard(state: ITicTacToeState) {
    const { width, height } = this.scale;
    const cellSize = 128;
    const cellGap = 5;

    let x = width * 0.5 - cellSize - cellGap;
    let y = height * 0.5 - cellSize - cellGap;
    state.board.forEach((cellState, idx) => {
      const cell = this.add
        .rectangle(x, y, cellSize, cellSize, 0xffffff)
        .setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
          this.server?.makeSelection(idx);
        });

      switch (cellState) {
        case Cell.X:
          this.add.star(cell.x, cell.y, 4, 4, 60, 0xff0000).setAngle(45);
          break;
        case Cell.O:
          this.add.circle(cell.x, cell.y, 50, 0x0000ff);
          break;
      }

      this.cells.push({ display: cell, value: cellState });

      if ((idx + 1) % 3 === 0) {
        y += cellSize + cellGap;
        x = width * 0.5 - cellSize - cellGap;
      } else {
        x += cellSize + cellGap;
      }
    });
  }

  private handleBoardChanged(newValue: Cell, idx: number) {
    const cell = this.cells[idx];
    if (cell.value === Cell.Empty) {
      switch (newValue) {
        case Cell.X:
          this.add
            .star(cell.display.x, cell.display.y, 4, 4, 60, 0xff0000)
            .setAngle(45);
          break;
        case Cell.O:
          this.add.circle(cell.display.x, cell.display.y, 50, 0x0000ff);
          break;
      }
      cell.value = newValue;
    } else {
      console.log("cell already has value");
    }
  }

  private handlePlayerTurnChanged(playerIndex: number) {
    console.log(playerIndex);
  }
}
