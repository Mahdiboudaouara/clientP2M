import { render, screen } from '@testing-library/react';
import About from '../src/components/About';

test('renders learn react link', () => {
  render(<About />);
  const linkElement = screen.getByText(/about/i);
  expect(linkElement).toBeInTheDocument(); 
});
 