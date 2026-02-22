import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio home section', () => {
  render(<App />);
  const nameElement = screen.getByText(/Shivam Kumar/i);
  expect(nameElement).toBeInTheDocument();
});
