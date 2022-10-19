import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import PasswordReset from "../PasswordReset";
import { BrowserRouter } from "react-router-dom";

//test block
describe("Test the login Component", () => {
  test("Test header", () => {
    // render the component on virtual dom
    render(
      <BrowserRouter>
        <PasswordReset />{" "}
      </BrowserRouter>
    );
    const headertext = screen.getByTestId("header");

    //interact with those elements

    expect(headertext).toHaveTextContent("Reset your Password");
  });

  test("Render the forgot password form", async () => {
    // render the component on virtual dom
    render(
      <BrowserRouter>
        <PasswordReset />{" "}
      </BrowserRouter>
    );
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(1);

    //This form renders the login page and makes sure the sign in button is present
  });
});
