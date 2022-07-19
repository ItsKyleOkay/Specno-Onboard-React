import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import SignIn from "./SignIn";

//test block
test("Test header", () => {
  // render the component on virtual dom
  render(<SignIn />);
  const headertext = screen.getByTestId("header");

  //interact with those elements

  expect(headertext).toHaveTextContent(
    "Hello! welcome to Specno's Onboarding platform"
  );
});
