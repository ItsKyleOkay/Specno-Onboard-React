import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import Login from "../SignIn";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
describe("Test the login Component", () => {
  //test block
  test("Render the login form", async () => {
    // render the component on virtual dom
    render(
      <BrowserRouter>
        <Login />{" "}
      </BrowserRouter>
    );
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(1);

    //This form renders the login page and makes sure the sign in button is present
  });

  test("email input field should accept email", () => {
    render(
      <BrowserRouter>
        <Login />{" "}
      </BrowserRouter>
    );
    const email = screen.getByPlaceholderText("Email address");
    userEvent.type(email, "test");
    expect(email.value).not.toMatch("test@gmail.com");
  });

  test("password input should have type password", () => {
    render(
      <BrowserRouter>
        <Login />{" "}
      </BrowserRouter>
    );
    const password = screen.getByPlaceholderText("Password");
    expect(password).toHaveAttribute("type", "password");
  });
});
