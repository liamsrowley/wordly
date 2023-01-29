import { useReducer, type ReactElement } from 'react';
import { getLetterOccurrencesFromArray } from './functions';
import {
  addLetter,
  initialState,
  reducer,
  removeLastLetter,
  resetGame,
  startNextTurn,
  submitGuess,
} from './Wordly.slice';
import { type Letter, LetterStatus } from './Wordly.types';

export const Wordly = (): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { lanes, turn, selectedWord } = state;
  const { letters } = lanes[turn];

  if (turn === 5) {
    return <div>No more turns</div>;
  }

  const handleSubmission = (): void => {
    const letterParts = Object.values(letters);
    const selectedWordLetters = selectedWord.toLowerCase().split('');

    const updatedLetterStatuses: Record<number, Letter> = {};

    let allLettersMatch = true;
    const occurrences = getLetterOccurrencesFromArray(selectedWordLetters);

    letterParts.forEach((letter) => {
      if (letter.status === LetterStatus.InWordRightPlace) return;

      const lowerCaseLetter = letter.value.toLowerCase();
      const isMatch = selectedWordLetters[letter.id - 1] === lowerCaseLetter;
      let status = isMatch
        ? LetterStatus.InWordRightPlace
        : LetterStatus.NotChecked;

      if (isMatch) {
        occurrences[lowerCaseLetter] -= 1;
        updatedLetterStatuses[letter.id] = { ...letter, status };
        return;
      }

      const isInWord =
        selectedWord.toLowerCase().includes(lowerCaseLetter) &&
        occurrences[lowerCaseLetter] > 0;

      if (isInWord) {
        allLettersMatch = false;
        status = LetterStatus.InWordWrongPlace;
        occurrences[lowerCaseLetter] -= 1;
      } else {
        allLettersMatch = false;
        status = LetterStatus.NotInWord;
      }

      updatedLetterStatuses[letter.id] = { ...letter, status };
    });

    // Check for ocurrences in word
    console.log(updatedLetterStatuses);

    dispatch(submitGuess(updatedLetterStatuses));

    if (allLettersMatch) {
      console.log('You win!');
    } else {
      // dispatch(startNextTurn());
    }
  };

  const colorMap: Record<number, string> = {
    [LetterStatus.InWordRightPlace]: 'green',
    [LetterStatus.InWordWrongPlace]: 'yellow',
    [LetterStatus.NotInWord]: 'red',
  };

  const handleLetter = (): void => {
    const letter = prompt('Enter letter') ?? 't';

    letter.split('').forEach((letter) => {
      dispatch(addLetter(letter));
    });
  };

  return (
    <div>
      <button onClick={handleLetter}>Add T letter</button>
      <button
        onClick={() => {
          dispatch(removeLastLetter());
        }}
      >
        Remove Last Letter
      </button>
      <button
        onClick={() => {
          dispatch(resetGame());
        }}
      >
        Reset Game State
      </button>
      <button onClick={handleSubmission}>Submit Guess</button>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        {Object.values(state.lanes[state.turn].letters).map((letter, i) => (
          <div
            key={i}
            style={{
              background: colorMap[letter.status],
              padding: '20px',
              fontWeight: 'bold',
              fontSize: '32px',
            }}
          >
            {letter.value}
          </div>
        ))}
      </div>
    </div>
  );
};
