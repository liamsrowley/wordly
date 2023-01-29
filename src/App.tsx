import { type ReactElement } from 'react';
import './App.css';
import { Wordly } from './features/wordly/Wordly';

function App(): ReactElement {
  return (
    <div className="App">
      <Wordly />
    </div>
  );
}

export default App;
