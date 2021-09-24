import { render, screen } from '@testing-library/react';
import Admin from './Admin';

test('renders menu', () => {
  render(<Admin />);
  const menuElement = screen.getByText(/DODGE/i);
  expect(menuElement).toBeInTheDocument();
});
