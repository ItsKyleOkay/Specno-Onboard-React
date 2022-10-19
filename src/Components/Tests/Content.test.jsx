import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import Content from "../../EmployeeMainPage/ContentQuiz";
import { BrowserRouter } from "react-router-dom";

describe("Test the login Component", () => {
  //test block
  test("Test header", () => {
    // render the component on virtual dom
    render(
      <BrowserRouter>
        <Content />{" "}
      </BrowserRouter>
    );
    const headertext = screen.getByTestId("header");

    //interact with those elements

    expect(headertext).toHaveTextContent("Your Processes");
  });

  test("Render the admin search form", async () => {
    // render the component on virtual dom
    render(
      <BrowserRouter>
        <Content />{" "}
      </BrowserRouter>
    );
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(6);

    //This form renders the login page and makes sure the sign in button is present
  });
});
