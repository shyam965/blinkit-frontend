
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { User, Package, MapPin, LogOut } from "lucide-react";
import { setUserDetails } from "../store/userSlice";
import { persistor } from "../store/store";

const UserMenu = () => {
    const user = useSelector((state) => state.user?.userDetails?.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {

        localStorage.removeItem("accessRefreshToken");
        localStorage.removeItem("accessToken");


        dispatch(setUserDetails(null));


        await persistor.flush();
        await persistor.purge();


        window.location.reload();
    };

    return (
        <div className="rounded-lg max-w-xs">
            <div className="flex items-center space-x-3 pb-3 border-b border-gray-200">
                <div className="bg-blue-100 rounded-full p-2">
                    <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800">My Account</h3>
                    <p className="text-sm text-gray-500 truncate">
                        {user?.name || user?.email || "Welcome back!"}
                    </p>
                </div>
            </div>

            <div className="mt-3 space-y-2">
                <Link
                    to="/orders"
                    className="flex items-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                    <Package className="h-4 w-4 mr-3 text-gray-500" />
                    My Orders
                </Link>

                <Link
                    to="/addresses"
                    className="flex items-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                    <MapPin className="h-4 w-4 mr-3 text-gray-500" />
                    Saved Addresses
                </Link>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                    <LogOut className="h-4 w-4 mr-3 text-gray-500" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserMenu;
