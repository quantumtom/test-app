import { render, screen } from '@testing-library/react';
import List from './List';

test('renders react list', () => {
  render(<List />);
  const listElement = screen.getByText(/DODGE/i);
  expect(listElement).toBeInTheDocument();
});
