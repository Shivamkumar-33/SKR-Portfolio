import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the About component which uses WebGL
jest.mock('./components/About/About', () => {
  return function MockAbout() {
    return <section id="about" data-testid="about-section">About Section</section>;
  };
});

// Mock react-parallax which also has issues in test environment
jest.mock('react-parallax', () => ({
  Parallax: ({ children }) => <div data-testid="parallax">{children}</div>,
}));

test('renders portfolio home section', () => {
  render(<App />);
  // Use getAllByText since "Shivam Kumar" appears multiple times in the portfolio
  const nameElements = screen.getAllByText(/Shivam Kumar/i);
  expect(nameElements.length).toBeGreaterThan(0);
});

test('renders navigation links', () => {
  render(<App />);
  // Multiple elements exist with these texts (nav links appear in multiple places)
  const projectsElements = screen.getAllByText(/Projects/i);
  const homeElements = screen.getAllByText(/Home/i);
  expect(projectsElements.length).toBeGreaterThan(0);
  expect(homeElements.length).toBeGreaterThan(0);
});
