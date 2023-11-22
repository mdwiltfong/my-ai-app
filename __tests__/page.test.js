import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from '@/app/page';
import { Provider } from '@gadgetinc/react';
import { api } from '../api';
import { FileProvider } from './fileDetails';

describe('App', () => {
  /*  it('does nothing', () => {
    render(<App />);
  }); */
  it('renders a form', () => {
    render(
      <FileProvider>
        <Provider api={api}>
          <App />
        </Provider>
      </FileProvider>
    );
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('renders an input', () => {
    render(
      <FileProvider>
        <Provider api={api}>
          <App />
        </Provider>
      </FileProvider>
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('allows the user to type into the input', async () => {
    render(
      <FileProvider>
        <Provider api={api}>
          <App />
        </Provider>
      </FileProvider>
    );

    const inputElement = screen.getByRole('textbox');
    await userEvent.type(inputElement, 'Hello, World!');

    expect(inputElement.value).toEqual('Hello, World!');
  });
});

// describe('App', () => {
//   it('renders a button', () => {
//     render(<App />);
//     expect(screen.getByRole('button')).toBeInTheDocument();
//   });
// });
