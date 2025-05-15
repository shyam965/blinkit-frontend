import React, { useEffect, useState } from "react";
import { use } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { put } from "../utils/Axios";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import toast from "react-hot-toast";

export const ResetPassword = () => {
  const navivate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  console.log(location);

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navivate("/");
    }
    if (location?.state?.email) {
      setData((prev) => {
        return { ...prev, email: location.state.email };
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await put("/api/user/resetpassword", data);

      if (response?.status == 200) {
        toast.success(response?.data?.message);
        navivate("/login")
        setData({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <>
      <section className="container w-full mx-auto px-2">
        <div className="my-4 bg-white w-full max-w-lg mx-auto rounded-md p-7">
          <h1 className="text-2xl font-bold mb-4">New password</h1>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="grid gap-1 mt-2">
              <label htmlFor="newpassword">New Password:</label>
              <div className="flex items-center bg-blue-50 rounded-md p-1">
                <input
                  type={showPassword ? "text" : "password"}
                  id="newpassword"
                  placeholder="Enter newPassword"
                  className="bg-blue-50 w-full p-1 rounded-md outline-none"
                  name="newPassword"
                  value={data.newPassword}
                  onChange={handleChange}
                />
                <div
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="cursor-pointer ml-2"
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
              </div>
            </div>
            {/* confirmPassword */}
            <div className="grid gap-1 mt-2">
              <label htmlFor="confirmpassword">Confirm Password:</label>
              <div className="flex items-center bg-blue-50 rounded-md p-1">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmpassword"
                  placeholder="Enter ConfirmPassword"
                  className="bg-blue-50 w-full p-1 rounded-md outline-none"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                />
                <div
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="cursor-pointer ml-2"
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="text-center w-full bg-green-500 hover:bg-green-800 mt-4 rounded-md p-2 font-semibold text-white"
            >
              Change Password
            </button>

            <div className="mt-2">
              <p>
                Already have an Account ?
                <Link
                  to={"/login"}
                  className="font-semibold text-green-600 hover:text-green-800"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
