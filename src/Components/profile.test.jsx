import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import ProfilePage from "./ProfilePage";

//test block
test("Test header", () => {
  // render the component on virtual dom
  render(<ProfilePage />);
  const headertext = screen.getByTestId("header");

  //interact with those elements

  expect(headertext).toHaveTextContent(
    "Designing And Building World Class Digital Products"
  );
});
