import { Room, Client } from "colyseus";
import { Dispatcher } from "@colyseus/command";
import TicTacToeState from "./schema/TicTacToeState";
import { Message } from "../../../types/messages";
import PlayerSelectionCommand from "../commands/PlayerSelectionCommand";
import { GameState } from "../../../types/ITicTacToeState";

export default class TicTacToe extends Room<TicTacToeState> {
  private dispatcher = new Dispatcher(this);

  onCreate() {
    this.maxClients = 2;
    this.setState(new TicTacToeState());

    this.onMessage(Message.PlayerSelection, (client, message) => {
      this.dispatcher.dispatch(new PlayerSelectionCommand(), {
        client,
        index: message.index,
      });
    });
  }

  onJoin(client: Client) {
    const idx = this.clients.findIndex((c) => c.sessionId === client.sessionId);
    client.send(Message.PlayerIndex, { playerIndex: idx });

    if (this.clients.length >= 2) {
      this.state.gameState = GameState.Playing;
    }
  }
}
