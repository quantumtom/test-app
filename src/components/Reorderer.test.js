import { render, screen } from '@testing-library/react';
import Reorderer from './Reorderer';

test('renders Reorderer', () => {
  render(<Reorderer />);
  const demoElement = screen.getByText(/Lists/i);
  expect(demoElement).toBeInTheDocument();
});
