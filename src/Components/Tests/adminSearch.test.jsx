import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Employee from "../../AdminMainPage/Employees";
import { BrowserRouter } from "react-router-dom";

describe("Test the login Component", () => {
  //test block
  test("render text on page", () => {
    // render the component on virtual dom
    render(
      <BrowserRouter>
        <Employee />
      </BrowserRouter>
    );
    const headertext = screen.getByTestId("header");

    //interact with those elements

    expect(headertext).toHaveTextContent("Employee Name");
  });

  test("search field should accept text", () => {
    render(
      <BrowserRouter>
        <Employee />{" "}
      </BrowserRouter>
    );
    const email = screen.getByPlaceholderText("Search");
    userEvent.type(email, "123");
    expect(email.value).not.toMatch("kyle");
  });

  test("Render the admin search form", async () => {
    // render the component on virtual dom
    render(
      <BrowserRouter>
        <Employee />{" "}
      </BrowserRouter>
    );
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(2);

    //This form renders the login page and makes sure the sign in button is present
  });
});
