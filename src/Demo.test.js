import { render, screen } from '@testing-library/react';
import Demo from './Demo';

test('renders Demo', () => {
  render(<Demo />);
  const demoElement = screen.getByText(/Demo Page/i);
  expect(demoElement).toBeInTheDocument();
});
