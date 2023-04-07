// import Phaser from "phaser";
//
// export default class TicTacToeGame extends Phaser.Scene {
//   constructor() {
//     super("tic-tac-toe-game");
//   }
//
//   create() {
//     this.add.rectangle(100, 100, 50, 50, 0xffffff);
//   }
// }
import Phaser from "phaser";
import type Server from "../services/Server";
import ITicTacToeState, {
  Cell,
  GameState,
} from "../../../types/ITicTacToeState";
import { IGameOverSceneData, IGameSceneData } from "../../../types/scenes";

export default class TicTacToeGame extends Phaser.Scene {
  private server?: Server;
  private onGameOver?: (data: IGameOverSceneData) => void;
  private cells: { display: Phaser.GameObjects.Rectangle; value: Cell }[] = [];
  private gameStateText?: Phaser.GameObjects.Text;

  constructor() {
    super("game");
  }

  init() {
    this.cells = [];
  }

  async create(data: IGameSceneData) {
    const { server, onGameOver } = data;

    this.server = server;
    this.onGameOver = onGameOver;

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

    if (this.server?.gameState === GameState.WaitingForPlayers) {
      const width = this.scale.width;
      this.gameStateText = this.add
        .text(width * 0.5, 50, "Waiting for opponent...")
        .setOrigin(0.5);
    }

    this.server?.onBoardChanged(this.handleBoardChanged, this);
    this.server?.onPlayerTurnChanged(this.handlePlayerTurnChanged, this);
    this.server?.onPlayerWon(this.handlePlayerWon, this);
    this.server?.onGameStateChanged(this.handleGameStateChanged, this);
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
    // console.log(playerIndex);
  }

  private handlePlayerWon(playerIndex: number) {
    this.time.delayedCall(1000, () => {
      if (!this.onGameOver || playerIndex === -1) {
        return;
      }

      this.onGameOver({ winner: this.server?.playerIndex === playerIndex });
    });
  }

  private handleGameStateChanged(state: GameState) {
    if (state === GameState.Playing && this.gameStateText) {
      this.gameStateText.destroy();
      this.gameStateText = undefined;
    }
  }
}
