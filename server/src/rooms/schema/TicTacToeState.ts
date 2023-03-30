import { Schema, type } from "@colyseus/schema";

export default class TicTacToeState extends Schema {
  @type("string") name = "ttt-state";
}
