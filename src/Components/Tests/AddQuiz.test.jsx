import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import NewQuizAdmin from "../../AdminMainPage/NewQuizAdmin";
import { BrowserRouter } from "react-router-dom";

describe("Test the login Component", () => {
  //test block
  test("Render the text on the page", () => {
    // render the component on virtual dom
    render(
      <BrowserRouter>
        <NewQuizAdmin />
      </BrowserRouter>
    );
    const headertext = screen.getByTestId("header");

    //interact with those elements

    expect(headertext).toHaveTextContent("New Quiz");
  });
  test("Render the admin search form", async () => {
    // render the component on virtual dom
    render(
      <BrowserRouter>
        <NewQuizAdmin />{" "}
      </BrowserRouter>
    );
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(3);

    //This form renders the login page and makes sure the sign in button is present
  });
});
