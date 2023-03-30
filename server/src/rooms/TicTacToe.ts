import { Room } from "colyseus";
import TicTacToeState from "./schema/TicTacToeState";

export default class TicTacToe extends Room<TicTacToeState> {
  onCreate() {
    this.setState(new TicTacToeState());
  }
}
