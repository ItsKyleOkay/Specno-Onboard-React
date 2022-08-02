import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import PasswordReset from "../PasswordReset";
import { BrowserRouter } from "react-router-dom";

//test block
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
