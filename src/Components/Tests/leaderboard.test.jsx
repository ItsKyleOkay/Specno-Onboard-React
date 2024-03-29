import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import Leaderboard from "../../EmployeeMainPage/Leaderboard";
import { BrowserRouter } from "react-router-dom";

//test block
test("Test header", () => {
  // render the component on virtual dom
  render(
    <BrowserRouter>
      <Leaderboard />
    </BrowserRouter>
  );
  const headertext = screen.getByTestId("header");

  //interact with those elements

  expect(headertext).toHaveTextContent("Your progress");
});
