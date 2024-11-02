import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
