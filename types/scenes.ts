export interface IGameOverSceneData {
  winner: boolean;
}

export interface IGameSceneData {
  server: any;
  onGameOver: (data: IGameOverSceneData) => void;
}
