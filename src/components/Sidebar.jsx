import React from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Box, Users, Settings, ShoppingBag } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  
  const menuItems = [
    { title: "Dashboard", icon: <BarChart size={20} />, path: "/admin/dashboard" },
    { title: "Products", icon: <Box size={20} />, path: "/admin/products" },
    { title: "Category", icon: <Box size={20} />, path: "/admin/category" },
    { title: "Orders", icon: <ShoppingBag size={20} />, path: "/admin/orders" },
    { title: "Users", icon: <Users size={20} />, path: "/admin/users" },
    { title: "Settings", icon: <Settings size={20} />, path: "/admin/settings" },
  ];

  return (
    <div className="fixed left-0 z-30 h-full w-64 bg-gray-800 text-white">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>
      
      <nav className="mt-6">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <button 
                onClick={() => navigate(item.path)}
                className="flex items-center w-full px-6 py-3 text-left hover:bg-gray-700 transition-colors"
              >
                <span className="mr-3">{item.icon}</span>
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

