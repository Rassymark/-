
export enum MenuType {
  HOME = 'HOME',
  NATURE = 'NATURE',
  WARM_ACTION = 'WARM_ACTION',
  EYE_EXERCISE = 'EYE_EXERCISE',
  AI_TUTORIAL = 'AI_TUTORIAL'
}

export interface DailyContent {
  warmAction: string;
  aiTip: {
    title: string;
    description: string;
    steps: string[];
  };
}
