export enum LetterStatus {
  NotChecked,
  NotInWord,
  InWordWrongPlace,
  InWordRightPlace,
}

export interface Lane {
  id: number;
  letters: Record<number, Letter>;
}

export interface Letter {
  id: number;
  value: string;
  status: LetterStatus;
}
