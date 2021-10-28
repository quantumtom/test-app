import { render, screen } from '@testing-library/react';
import Lists from './Lists';

test('renders Lists', () => {
  render(<Lists />);
  const listsElement = screen.getByText(/Lists/i);
  expect(listsElement).toBeInTheDocument();
});
