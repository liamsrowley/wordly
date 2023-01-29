import { LetterStatus, type Letter } from './Wordly.types';

export function allLettersCorrect(letters: Letter[]): boolean {
  return (
    letters.filter((letter) => letter.status === LetterStatus.InWordRightPlace)
      .length !== 0
  );
}

export function getLetterOccurrencesFromArray(
  input: string[]
): Record<string, number> {
  const occurrences: Record<string, number> = {};
  input.forEach((letter) => {
    if (occurrences[letter] === undefined) {
      occurrences[letter] = 1;
    } else {
      occurrences[letter] = occurrences[letter] + 1;
    }
  });

  return occurrences;
}
