export interface Player {
    rank: number;
    username: string;
    level: number;
    xp: number;
    gold: number;
    isInfected: Boolean;
  }
  
  export interface Item {
    id: string;
    name: string;
    type: string;
    description: string;
    cost: number;
  }
  