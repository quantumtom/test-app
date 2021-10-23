import { render, screen } from '@testing-library/react';
import NavMenu from './NavMenu';

test('renders NavMenu', () => {
  render(<NavMenu />);
  const menuElement = screen.getByText(/Commercials/i);
  expect(menuElement).toBeInTheDocument();
});
