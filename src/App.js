import React from "react";
import Application from "./Components/Application";
import UserProvider from "./providers/UserProvider";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Application />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
