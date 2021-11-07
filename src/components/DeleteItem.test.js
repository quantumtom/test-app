import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import DeleteItem from './DeleteItem';

test('renders Delete Item component', () => {
  render(<DeleteItem />);
  const deleteItemElement = screen.getByText(/Delete/i);
  expect(deleteItemElement).toBeInTheDocument();
});

test('renders Delete button', async () => {
  render(<DeleteItem />);

  const openButton = screen.getByRole('button');

  expect(openButton).toBeInTheDocument();

  fireEvent.click(openButton);

  await waitFor(() => screen.getByText(/Delete Record/i));

  expect(screen.getByText(/Yes/i)).toBeInTheDocument();

  expect(screen.getByText(/No/i)).toBeInTheDocument();
});
