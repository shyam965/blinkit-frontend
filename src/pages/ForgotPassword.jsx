import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import toast from "react-hot-toast";
import { post, put } from "../utils/Axios";
import { Link, useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
  });

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
      const response = await put("/api/user/forgotpassword", data);

      if (response?.status == 200) {
        toast.success(response?.data?.message);
        navigate("/verifyotp", {
          state: data,
        });
        setData({
          email: "",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <section className="container w-full mx-auto px-2">
      <div className="my-4 bg-white w-full max-w-lg mx-auto rounded-md p-7">
        <h1 className="text-2xl font-bold mb-4">Forgot password</h1>
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

          <button
            type="submit"
            className="text-center w-full bg-green-500 hover:bg-green-800 mt-4 rounded-md p-2 font-semibold text-white"
          >
            Submit
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
  );
};
