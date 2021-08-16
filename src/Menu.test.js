import { render, screen } from '@testing-library/react';
import Menu from './Menu';

test('renders menu', () => {
  render(<Menu />);
  const menuElement = screen.getByText(/DODGE/i);
  expect(menuElement).toBeInTheDocument();
});
