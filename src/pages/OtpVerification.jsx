import React, { useEffect, useRef, useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import toast from "react-hot-toast";
import { post, put } from "../utils/Axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const OtpVerification = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(["", "", "", "", "", ""]);

  const inputRef = useRef([]);

  const location = useLocation();
  // console.log(location, "kjdjsdjsdjk");

  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgotpassword");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await put("/api/user/verifypasswordotp", {
        otp: data.join(""),
        email: location.state.email,
      });

      if (response?.status === 200) {
        toast.success(response?.data?.message);
        setData(["", "", "", "", "", ""]);
        navigate("/resetpassword", {
          state: {
            email: location?.state?.email,
            data: response?.data,
          },
        });
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    }
  };

  return (
    <section className="container w-full mx-auto px-2">
      <div className="my-4 bg-white w-full max-w-lg mx-auto rounded-md p-7">
        <h1 className="text-2xl font-bold mb-4">OTP Verification</h1>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="grid gap-1 mt-2">
            <label htmlFor="otp">Enter Otp:</label>
            <div className="flex items-center gap-2 justify-between">
              {data.map((element, index) => {
                return (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    id="otp"
                    ref={(ref) => {
                      inputRef.current[index] = ref;
                      return ref;
                    }}
                    value={data[index]}
                    onChange={(e) => {
                      const value = e.target.value;

                      const newData = [...data];
                      newData[index] = value;
                      setData(newData);
                      if (value && index < 5) {
                        inputRef.current[index + 1].focus();
                      }
                    }}
                    className="outline-none text-center font-semibold w-full max-w-16 bg-blue-50 p-1 rounded-md focus:border-primary-200"
                  />
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="text-center w-full bg-green-500 hover:bg-green-800 mt-4 rounded-md p-2 font-semibold text-white"
          >
            Verify Otp
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
