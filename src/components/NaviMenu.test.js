import { render, screen } from '@testing-library/react';
import NaviMenu from './NaviMenu';

test('renders NaviMenu', () => {
  render(<NaviMenu />);
  const naviMenuElement = screen.getByText(/Commercials/i);
  expect(naviMenuElement).toBeInTheDocument();
});
