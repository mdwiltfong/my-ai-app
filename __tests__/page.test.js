import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '@/app/page';

describe('App', () => {
  it('renders a form', () => {
    render(<App />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });
})