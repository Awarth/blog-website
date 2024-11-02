import React from "react";
import { useNavigate } from "react-router";

function Header() {
  const navigate = useNavigate();
  const handleHomeNavigate = () => {
    navigate("/");
  };
  return (
    <>
      <header className="w-full flex items-center justify-center text-5xl font-medium py-4 px-6 border-b sticky top-0 bg-[#ffffffc6] bg-opacity-50 backdrop-blur-xl z-10">
        <span onClick={handleHomeNavigate} className="logo cursor-pointer">Shivangi</span>
      </header>
    </>
  );
}

export default Header;
