import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "@/app/page";
import { Provider } from "@gadgetinc/react";
import { api } from "../api";

describe("App", () => {
  /*  it('does nothing', () => {
    render(<App />);
  }); */
  it("renders a form", () => {
    render(
      <Provider api={api}>
        <App />
      </Provider>
    );
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("renders an input", () => {
    render(
      <Provider api={api}>
        <App />
      </Provider>
    );
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("allows the user to type into the input", async () => {
    render(
      <Provider api={api}>
        <App />
      </Provider>
    );

    const inputElement = screen.getByRole("textbox");
    await userEvent.type(inputElement, "Hello, World!");

    expect(inputElement.value).toEqual("Hello, World!");
  });
});

// describe('App', () => {
//   it('renders a button', () => {
//     render(<App />);
//     expect(screen.getByRole('button')).toBeInTheDocument();
//   });
// });
