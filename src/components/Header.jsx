import React, { useState, useEffect, useRef } from "react";
import { Search } from "./search";
import { FaRegUserCircle } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import UserMenu from "./UserMenu";

export const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.userDetails?.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const redirectLogin = () => navigate("/login");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="lg:h-20 h-24 lg:shadow-md sticky top-0 flex justify-center flex-col bg-white">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="lg:h-[60px] lg:w-[180px] h-[40px] w-[140px]" />
        </div>

        <div className="hidden lg:block">
          <Search />
        </div>

        <div className="flex items-center gap-4" ref={menuRef}>
          {user ? (
            <div className="relative">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
                <p>Account</p>
                {menuOpen ? <BiSolidUpArrow className="h-3 w-3" /> : <BiSolidDownArrow className="h-3 w-3" />}
              </div>
              {menuOpen && (
                <div className="absolute right-0 mt-5 bg-white rounded shadow-lg w-52 p-2 z-50">
                  <UserMenu />
                </div>
              )}
            </div>
          ) : (
            <button onClick={redirectLogin} className="text-lg px-2">Login</button>
          )}

          <button className="flex items-center gap-2 text-white bg-green-600 rounded-md p-2">
            <TiShoppingCart size={26} />
            <p className="font-semibold">My Cart</p>
          </button>
        </div>
      </div>

      <div className="container mx-auto p-1 lg:hidden">
        <Search />
      </div>
    </header>
  );
};
