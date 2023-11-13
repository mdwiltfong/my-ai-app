import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from '@/app/page';

describe('App', () => {
  it('renders a form', () => {
    render(<App />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('renders an input', () => {
    render(<App />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('allows the user to type into the input', () => {
    render(<App />);

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'Hello, World!' } });
    // userEvent is a more realistic way to test than fireEvent, but doesn't seem to work here
    // userEvent.type(inputElement, 'Hello, World!');
    console.log(inputElement.value)
    expect(inputElement.value).toEqual('Hello, World!');
  });
});

// describe('App', () => {
//   it('renders a button', () => {
//     render(<App />);
//     expect(screen.getByRole('button')).toBeInTheDocument();
//   });
// });
