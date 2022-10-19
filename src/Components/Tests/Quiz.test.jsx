import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import QuizSection from "../../EmployeeMainPage/QuizSection";
import { BrowserRouter } from "react-router-dom";

//test block
describe("Test the login Component", () => {
  test("Test header", () => {
    // render the component on virtual dom
    render(
      <BrowserRouter>
        <QuizSection />{" "}
      </BrowserRouter>
    );
    const headertext = screen.getByTestId("header");

    //interact with those elements

    expect(headertext).toHaveTextContent("Check");
  });
  test("Render the quiz form", async () => {
    // render the component on virtual dom
    render(
      <BrowserRouter>
        <QuizSection />{" "}
      </BrowserRouter>
    );
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(6);

    //This form renders the login page and makes sure the sign in button is present
  });
});
