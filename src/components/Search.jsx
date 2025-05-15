import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
export const Search = () => {
  const [isSearchPage, setIsSearchPage] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  // console.log(location,"location")
  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  console.log("serch", isSearchPage);
  return (
    <>
      <div className="w-full min-w-[300px] lg:min-w-[420px] lg:h-12 h-10 rounded-lg border flex items-center overflow-hidden text-neutral-500 group focus-within:border-primary-200 bg-slate-50">
        <button className="flex justify-center items-center h-full p-3 group-focus-within:text-primary-200">
          <FaSearch size={22} />
        </button>

        <div className="w-full h-full">
          {!isSearchPage ? (
            // not in seach page
            <div
              onClick={redirectToSearchPage}
              className="w-full h-full flex items-center"
            >
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  'search "milk"',
                  1000, // wait 1s before replacing "Mice" with "Hamsters"
                  'search "paneer"',
                  1000,
                  'search "dahi"',
                  1000,
                  'search "ghee"',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                // style={{ fontSize: "2em", display: "inline-block" }}
                repeat={Infinity}
              />
            </div>
          ) : (
            //  when i was search page
            <div className="w-full h-full">
              <input
                type="text"
                placeholder="Search..."
                autoFocus
                className="bg-transparent w-full h-full outline-none"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
