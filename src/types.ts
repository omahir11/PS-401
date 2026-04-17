export type Topic = 'Programming' | 'General Knowledge' | 'Science / Technology';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  topic: Topic;
  difficulty: Difficulty;
}

export interface PlayerCharacter {
  id: string;
  name: string;
  maxHp: number;
  description: string;
  imagePath?: string;
  attackImagePaths?: string[];
  attackType?: 'melee' | 'ranged';
  winImagePath?: string;
  deathImagePath?: string;
}

export interface Enemy {
  id: string;
  name: string;
  maxHp: number;
  currentHp: number;
  difficulty: Difficulty;
  title: string;
  imagePath?: string;
  attackImagePaths?: string[];
  attackType?: 'melee' | 'ranged';
  winImagePath?: string;
  deathImagePath?: string;
}

export interface GameState {
  playerHp: number;
  playerMaxHp: number;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  enemiesDefeated: number;
  status: 'start' | 'character-select' | 'boss-select' | 'battle' | 'win' | 'game-over';
}

export interface BattleAction {
  id: string;
  text: string;
  type: 'player' | 'enemy' | 'system';
}

