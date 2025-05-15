import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto p-4 text-center flex flex-col gap-2 lg:flex-row lg:justify-between ">
        <p>© All Rights Reserved 2021.</p>
 
        <div className="flex justify-center item center gap-3 text-2xl ">
          <a href="" className="hover:text-primary-100">
            <FaFacebook />
          </a>
          <a href="" className="hover:text-primary-100">
            <FaTwitterSquare />
          </a>
          <a href="" className="hover:text-primary-100">
            <FaInstagramSquare />
          </a>
        </div>
      </div>
    </footer>
  );
};
