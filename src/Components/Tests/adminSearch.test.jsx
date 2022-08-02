import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import Employee from "../../AdminMainPage/Employees";
import { BrowserRouter } from "react-router-dom";

//test block
test("Test header", () => {
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
