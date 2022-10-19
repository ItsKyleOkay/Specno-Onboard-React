import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import ContentDataAdminEdit from "../../AdminMainPage/ContentDataAdminEdit";
import { BrowserRouter } from "react-router-dom";

//test block
test("Render text on form", () => {
  // render the component on virtual dom
  render(
    <BrowserRouter>
      <ContentDataAdminEdit />
    </BrowserRouter>
  );
  const headertext = screen.getByTestId("header");

  //interact with those elements

  expect(headertext).toHaveTextContent("Save");
});
