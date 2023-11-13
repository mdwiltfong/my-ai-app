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

  it('allows the user to type into the input', async () => {
    render(<App />);

    const inputElement = screen.getByRole('textbox');
    await userEvent.type(inputElement, 'Hello, World!')
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
