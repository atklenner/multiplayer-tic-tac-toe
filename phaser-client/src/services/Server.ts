import { Client, Room } from "colyseus.js";
import Phaser from "phaser";
import ITicTacToeState, { GameState } from "../../../types/ITicTacToeState";
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

  get gameState() {
    if (!this.room) {
      return GameState.WaitingForPlayers;
    }
    return this.room.state.gameState;
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

          case "winningPlayer":
            this.events.emit(Events.PlayerWin, value);
            break;

          case "gameState":
            this.events.emit(Events.GameState, value);
            break;
        }
      });
    };

    this.room.state.board.onChange = (item, idx: number) => {
      // item: player
      // idx: board cell index
      this.events.emit(Events.BoardChange, item, idx);
    };
  }

  leave() {
    this.room?.leave();
    this.events.removeAllListeners();
  }

  makeSelection(idx: number) {
    if (!this.room) {
      // should throw an error
      console.log("there is no room");
      return;
    }

    if (this.room.state.gameState !== GameState.Playing) {
      return;
    }

    if (this.playerIndex !== this.room.state.activePlayer) {
      console.log("not your turn!");
      return;
    }

    this.room.send(Message.PlayerSelection, { index: idx });
  }

  onceStateChanged(cb: (state: ITicTacToeState) => void, context?: any) {
    this.events.once(Events.OnceStateChange, cb, context);
  }

  onBoardChanged(cb: (cell: number, index: number) => void, context?: any) {
    this.events.on(Events.BoardChange, cb, context);
  }

  onPlayerTurnChanged(cb: (playerIndex: number) => void, context?: any) {
    this.events.on(Events.PlayerTurnChange, cb, context);
  }

  onPlayerWon(cb: (playerIndex: number) => void, context?: any) {
    this.events.on(Events.PlayerWin, cb, context);
  }

  onGameStateChanged(cb: (state: GameState) => void, context?: any) {
    this.events.on(Events.GameState, cb, context);
  }
}
