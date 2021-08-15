import { render, screen } from '@testing-library/react';
import SaveButton from './SaveButton';

test('renders SaveButton', () => {
  render(<SaveButton />);
  const saveButtonElement = screen.getByText(/CLICK/i);
  expect(saveButtonElement).toBeInTheDocument();
});
