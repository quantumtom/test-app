import { render, screen } from '@testing-library/react';
import Menu from './Menu';

test('renders learn react menu', () => {
    render(<Menu />);
    const menuElement = screen.getByText(/item 0/i);
    expect(menuElement).toBeInTheDocument();
});
