import { Room } from "colyseus";
import { Dispatcher } from "@colyseus/command";
import TicTacToeState from "./schema/TicTacToeState";
import { Message } from "../../../types/messages";
import PlayerSelectionCommand from "../commands/PlayerSelectionCommand";

export default class TicTacToe extends Room<TicTacToeState> {
  private dispatcher = new Dispatcher(this);

  onCreate() {
    this.setState(new TicTacToeState());

    this.onMessage(Message.PlayerSelection, (client, message) => {
      this.dispatcher.dispatch(new PlayerSelectionCommand(), {
        client,
        index: message.index,
      });
    });
  }
}
