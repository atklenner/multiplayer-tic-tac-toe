import { Client, Room } from "colyseus.js";
import Phaser from "phaser";
import ITicTacToeState from "../../../types/ITicTacToeState";
import { Schema } from "@colyseus/schema";
import { Message } from "../../../types/messages";
import { Events } from "../../../types/events";

export default class Server {
  private client: Client;
  private events: Phaser.Events.EventEmitter;

  private room?: Room<ITicTacToeState & Schema>;
  private _playerIndex = -1;

  get playerIndex() {
    return this._playerIndex;
  }

  constructor() {
    this.client = new Client("ws://localhost:2567");
    this.events = new Phaser.Events.EventEmitter();
  }

  async join() {
    this.room = await this.client.joinOrCreate<ITicTacToeState>("tic-tac-toe");

    this.room?.onMessage(
      Message.PlayerIndex,
      (message: { playerIndex: number }) =>
        (this._playerIndex = message.playerIndex)
    );

    this.room?.onStateChange.once((state) => {
      this.events.emit(Events.OnceStateChange, state);
    });

    this.room.state.onChange = (changes) => {
      changes.forEach((change) => {
        const { field, value } = change;
        switch (field) {
          case "activePlayer":
            this.events.emit(Events.PlayerTurnChange, value);
            break;

          default:
            break;
        }
      });
    };

    this.room.state.board.onChange = (item, idx) => {
      // item: player
      // idx: board cell index
      this.events.emit("board-changed", item, idx);
    };
  }

  makeSelection(idx: number) {
    if (!this.room) {
      // should throw an error
      console.log("there is no room");
      return;
    }

    this.room.send(Message.PlayerSelection, { index: idx });
  }

  onceStateChanged(cb: (state: ITicTacToeState) => void, context?: any) {
    this.events.once("once-state-changed", cb, context);
  }

  onBoardChanged(cb: (cell: number, index: number) => void, context?: any) {
    this.events.on("board-changed", cb, context);
  }
}
