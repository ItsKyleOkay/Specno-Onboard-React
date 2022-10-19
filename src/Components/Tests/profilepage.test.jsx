import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import ProfilePage from "../ProfilePage";
import { BrowserRouter } from "react-router-dom";

describe("Test the login Component", () => {
  //test block
  test("render the text on page", async () => {
    // render the component on virtual dom
    render(
      <BrowserRouter>
        <ProfilePage />
      </BrowserRouter>
    );
    const headertext = await screen.getByTestId("header");

    //interact with those elements

    expect(headertext).toHaveTextContent(
      "Welcome back to your onboarding at Specno"
    );
  });

  test("Render the dashboard form", async () => {
    // render the component on virtual dom
    render(
      <BrowserRouter>
        <ProfilePage />
      </BrowserRouter>
    );
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(1);

    //This form renders the login page and makes sure the sign in button is present
  });
});
