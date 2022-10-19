import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import Quiz from "../../EmployeeMainPage/Quiz";
import { BrowserRouter } from "react-router-dom";

//test block
describe("Test the login Component", () => {
  test("Renders text on form", () => {
    // render the component on virtual dom
    render(
      <BrowserRouter>
        <Quiz />{" "}
      </BrowserRouter>
    );
    const headertext = screen.getByTestId("header");

    //interact with those elements

    expect(headertext).toHaveTextContent("Specno");
  });

  test("Render the quiz display form", async () => {
    // render the component on virtual dom
    render(
      <BrowserRouter>
        <Quiz />{" "}
      </BrowserRouter>
    );
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(6);

    //This form renders the login page and makes sure the sign in button is present
  });
});
