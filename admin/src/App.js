import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <Outlet />
      <Toaster />
    </div>
  );
}

export default App;
