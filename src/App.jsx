// import React from "react";
// import { Outlet } from "react-router-dom";
// import { Header } from "./components/Header";
// import { Footer } from "./components/Footer";
// import toast, { Toaster } from 'react-hot-toast';
// export const App = () => {
//   return (
//     <>
//       <Header />
//       <main className="min-h-[78vh]">
//         <Outlet />
//       </main>
//       <Footer />
//       <Toaster />
//     </>
//   );
// };

import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from "./components/Sidebar";
import { useSelector } from "react-redux";


export const App = () => {
  const user = useSelector((state) => state.user?.userDetails?.user);
  console.log(user,"skksdks")
  
  
  const isAdmin = user?.role === "ADMIN";
 
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
     
      <div className="flex flex-grow">
       
        {isAdmin && <Sidebar />}
       
        
        <main className={`flex-grow ${isAdmin ? "ml-64" : "ml-0"}`}>
          <div className="container mx-auto p-4 min-h-[78vh]">
            <Outlet />
          </div>
        </main>
      </div>
     
      <Footer />
      <Toaster />
    </div>
  );
};
