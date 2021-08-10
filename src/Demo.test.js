import { render, screen } from '@testing-library/react';
import Demo from './Demo';

test('renders learn react demo', () => {
  render(<Demo />);
  const demoElement = screen.getByText(/DODGE/i);
  expect(demoElement).toBeInTheDocument();
});
