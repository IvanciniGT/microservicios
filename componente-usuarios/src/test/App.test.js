import { render, screen } from '@testing-library/react';
import User from '../components/user/UserView';

test('renders learn react link', () => {
  render(<User />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
