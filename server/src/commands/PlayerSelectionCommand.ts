import { Command } from "@colyseus/command";
import { Client } from "colyseus";
import { Cell, GameState } from "../../../types/ITicTacToeState";
import TicTacToe from "../rooms/TicTacToe";
import CheckWinnerCommand from "./CheckWinnerCommand";

type Payload = {
  client: Client;
  index: number;
};

export default class PlayerSelectionCommand extends Command<
  TicTacToe,
  Payload
> {
  execute(data: Payload) {
    const { client, index } = data;

    if (this.room.state.gameState !== GameState.Playing) {
      return;
    }

    const clientIndex = this.room.clients.findIndex((c) => c.id === client.id);

    if (clientIndex !== this.room.state.activePlayer) {
      return;
    }

    if (this.room.state.board[index] !== Cell.Empty) {
      return;
    }

    const cellValue = clientIndex === 0 ? Cell.X : Cell.O;

    this.room.state.board[index] = cellValue;

    return [new CheckWinnerCommand()];
  }
}
