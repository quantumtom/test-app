import { render, screen } from '@testing-library/react';
import Demo from './Demo';

test('renders Demo', () => {
  render(<Demo />);
  const demoElement = screen.getByText(/Admin/i);
  expect(demoElement).toBeInTheDocument();
});
