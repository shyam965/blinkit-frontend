import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import toast from "react-hot-toast";
import { post } from "../utils/Axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const dispatch=useDispatch()

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
      const response = await post("/api/user/login", data);
      console.log(response, "kkkkkkkkkkkkkk");

      if (response?.status == 200) {
        toast.success(response?.data?.message || "Login successful!");
        localStorage.setItem("accessToken", response?.data?.data?.accessToken);
        localStorage.setItem(
          "accessRefreshToken",
          response?.data?.data?.accessRefreshToken
        );
        dispatch(setUserDetails(response?.data?.data));
        setData({
          email: "",
          password: "",
        });
        navigate("/admin");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <section className="container w-full mx-auto px-2">
      <div className="my-4 bg-white w-full max-w-lg mx-auto rounded-md p-7">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="grid gap-1 mt-2">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className="outline-none bg-blue-50 p-1 rounded-md"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-1 mt-2">
            <label htmlFor="password">Password:</label>
            <div className="flex items-center bg-blue-50 rounded-md p-1">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter Password"
                className="bg-blue-50 w-full p-1 rounded-md outline-none"
                name="password"
                value={data.password}
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

          <div className="mt-1 flex justify-end ">
            <Link to={"/forgotpassword"} className="text-primary-200">
              Forgot Password
            </Link>
          </div>

          <button
            type="submit"
            className="text-center w-full bg-green-500 hover:bg-green-800 mt-4 rounded-md p-2 font-semibold text-white"
          >
            Submit
          </button>

          <div className="mt-2">
            <p>
              Don't have an Account ?{" "}
              <Link
                to={"/register"}
                className="font-semibold text-green-600 hover:text-green-800"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};
