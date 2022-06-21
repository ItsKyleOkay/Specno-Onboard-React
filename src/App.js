import React from "react";
import Application from "./Components/Application";
import UserProvider from "./providers/UserProvider";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Application />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
