export interface IGameOverSceneData {
  winner: boolean;
  onRestart?: () => void;
}

export interface IGameSceneData {
  server: any;
  onGameOver: (data: IGameOverSceneData) => void;
}
