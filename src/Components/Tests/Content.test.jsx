import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import Content from "../../EmployeeMainPage/ContentQuiz";
import { BrowserRouter } from "react-router-dom";

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
