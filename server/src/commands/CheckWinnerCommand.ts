import { Command } from "@colyseus/command";
import TicTacToe from "../rooms/TicTacToe";
import NextTurnCommand from "./NextTurnCommand";
import { Cell } from "../../../types/ITicTacToeState";

type Payload = {};

const getValueAt = (board: number[], row: number, col: number) => {
  const idx = row * 3 + col;
  return board[idx];
};

const wins = [
  [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
  ],
  [
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: 1, col: 2 },
  ],
  [
    { row: 2, col: 0 },
    { row: 2, col: 1 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 0 },
    { row: 1, col: 0 },
    { row: 2, col: 0 },
  ],
  [
    { row: 0, col: 1 },
    { row: 1, col: 1 },
    { row: 2, col: 1 },
  ],
  [
    { row: 0, col: 2 },
    { row: 1, col: 2 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 0 },
    { row: 1, col: 1 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 2 },
    { row: 1, col: 1 },
    { row: 0, col: 2 },
  ],
];

export default class CheckWinnerCommand extends Command<TicTacToe & Payload> {
  private determineWin() {
    // loops through every possible winning case
    for (let i = 0; i < wins.length; i++) {
      const win = wins[i];
      let hasWinner = true;
      // checks if the specific winning case occurs
      for (let j = 1; j < win.length; j++) {
        const prevCell = win[j - 1];
        const cell = win[j];

        const prevValue = getValueAt(
          this.state.board,
          prevCell.row,
          prevCell.col
        );
        const cellValue = getValueAt(this.state.board, cell.row, cell.col);

        if (prevValue !== cellValue || prevValue === Cell.Empty) {
          hasWinner = false;
          break;
        }
      }
      if (hasWinner) {
        return win;
      }
    }
    return false;
  }

  execute() {
    const win = this.determineWin();
    if (win) {
      this.state.winningPlayer = this.state.activePlayer;
    } else {
      return [new NextTurnCommand()];
    }
  }
}
