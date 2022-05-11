import { render, screen } from '@testing-library/react';
import ToDoPanel from './ToDoPanel';

test('renders learn react link', () => {
  render(<ToDoPanel />);
  //const linkElement = screen.getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();
});
