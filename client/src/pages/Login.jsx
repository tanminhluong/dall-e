import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/userActions";
import { Toast } from "flowbite-react";
import { HiExclamation } from "react-icons/hi";

const Login = () => {
  const { loading, error, userInfo } = useSelector((state) => state.user);

  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleLogin = async (formData, e) => {
    dispatch(userLogin(formData));
  };
  return (
    <section className="max-w-xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[32px] text-[#222328]">Login</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          To create and share fabulous images that generated by Dall-E AI!
        </p>
        <form onSubmit={handleSubmit(handleLogin)} className="mt-10 ">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col  gap-2 mb-2">
              <label
                htmlFor={"username"}
                className="block text-sm font-medium text-gray-900 "
              >
                Username:
              </label>
              <input
                type="text"
                {...register("username", {
                  required: {
                    value: true,
                    message: "Please enter Username",
                  },
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
              />
              <p className="mt-2 text-red-700 text-sm ">
                {errors.username?.message}
              </p>
            </div>
            <div className="flex flex-col  gap-2 mb-2">
              <label
                htmlFor={"password"}
                className="block text-sm font-medium text-gray-900 "
              >
                Password:
              </label>
              <input
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Please enter password",
                  },
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
              />
              <p className="mt-2 text-red-700 text-sm ">
                {errors.password?.message}
              </p>
            </div>

            <div className="mt-5 flex justify-between gap-5">
              <button
                type="submit"
                className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center  "
              >
                Sign In
              </button>
              <div className="self-center jutify-end ">
                <Link to="/">
                  <span className="text-gray-900 text-sm underline ">
                    Forget password?
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </form>

        <p className="mx-auto mt-12 text-center text-[#666e75] text-[16px] max-w-[500px]">
          Dont have account ?{" "}
          <Link to="/auth/register" className="text-[#6161f3] underline ">
            Sign up
          </Link>{" "}
          to join and share with the community
        </p>
        {error && (
          <Toast className="mx-auto mt-10">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
              <HiExclamation className="h-5 w-5" />
            </div>
            <div className="ml-3 text-medium text-red-700 font-bold">
              {error}.
            </div>
            <Toast.Toggle />
          </Toast>
        )}
      </div>
    </section>
  );
};

export default Login;