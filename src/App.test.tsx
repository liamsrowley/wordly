import App from './App';
import { render } from '@testing-library/react';

describe('App', () => {
  it('renders hello world', () => {
    render(<App />);
    expect(1).toStrictEqual(1);
  });
});
