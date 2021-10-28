import { render, screen } from '@testing-library/react';
import Demo from './Main';

test('renders Demo', () => {
  render(<Demo />);
  const demoElement = screen.getByText(/Admin/i);
  expect(demoElement).toBeInTheDocument();
});
