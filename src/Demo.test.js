import { render, screen } from '@testing-library/react';
import List from './List';
import SaveButton from './SaveButton';

test('renders List', () => {
  render(<List />);
  const demoElement = screen.getByText(/DODGE/i);
  expect(demoElement).toBeInTheDocument();
});

test('renders SaveButton', async () => {
  render(<SaveButton />);
  const saveButtonElement = await screen.getByText(/CLICK ME/i);
  expect(saveButtonElement).toBeInTheDocument();
});
