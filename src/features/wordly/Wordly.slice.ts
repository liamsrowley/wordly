import { type Letter, LetterStatus, type Lane } from './Wordly.types';

interface GameState {
  turn: number;
  lanes: Record<number, Lane>;
  selectedWord: string;
}

interface Action {
  type: string;
  payload?: unknown;
}

export const initialState: GameState = {
  turn: 1,
  lanes: {
    1: {
      id: 1,
      letters: {},
    },
    2: {
      id: 2,
      letters: {},
    },
    3: {
      id: 3,
      letters: {},
    },
    4: {
      id: 4,
      letters: {},
    },
    5: {
      id: 5,
      letters: {},
    },
  },
  selectedWord: 'Trade',
};

// Action Definitions
const ADD_LETTER = 'Wordly::AddLetter';
const REMOVE_LETTER = 'Wordly::RemoveLetter';
const SUBMIT_GUESS = 'Wordly::SubmitGuess';
const RESET_GAME = 'Wordly::ResetGame';
const START_NEXT_TURN = 'Wordly::StartNextTurn';

let currentId = 0;

// Action Creators
export const addLetter = (letter: string): Action => {
  currentId += 1;
  return {
    type: ADD_LETTER,
    payload: {
      id: currentId,
      value: letter,
      status: LetterStatus.NotChecked,
    },
  };
};

export const removeLastLetter = (): Action => {
  currentId -= 1;
  return {
    type: REMOVE_LETTER,
  };
};

export const submitGuess = (letters: Record<number, Letter>): Action => {
  return {
    type: SUBMIT_GUESS,
    payload: letters,
  };
};

export const resetGame = (): Action => {
  currentId = 0;
  return {
    type: RESET_GAME,
  };
};

export const startNextTurn = (): Action => {
  currentId = 0;
  return {
    type: START_NEXT_TURN,
  };
};

// Reducer
export const reducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case ADD_LETTER: {
      const letter = action.payload as Letter;
      const { turn, lanes } = state;

      return {
        ...state,
        lanes: {
          ...lanes,
          [turn]: {
            ...lanes[turn],
            letters: {
              ...lanes[turn].letters,
              [letter.id]: letter,
            },
          },
        },
      };
    }

    case REMOVE_LETTER: {
      const { turn, lanes } = state;
      const letters = Object.assign({}, lanes[turn].letters);

      return {
        ...state,
        lanes: {
          ...lanes,
          [turn]: {
            ...lanes[turn],
            letters,
          },
        },
      };
    }

    case SUBMIT_GUESS: {
      const { turn, lanes } = state;
      const letters = action.payload as Record<number, Letter>;
      return {
        ...state,
        lanes: {
          ...lanes,
          [turn]: {
            ...lanes[turn],
            letters,
          },
        },
      };
    }

    case START_NEXT_TURN: {
      return { ...state, turn: state.turn + 1 };
    }

    case RESET_GAME:
      return initialState;

    default:
      return state;
  }
};
