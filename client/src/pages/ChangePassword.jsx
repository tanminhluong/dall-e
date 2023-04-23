import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Header } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { changeUserPassword, userLogout } from "../redux/userActions";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "flowbite-react";
import { HiExclamation } from "react-icons/hi";

const ChangePassword = () => {
  const { error, userInfo } = useSelector((state) => state.user);

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profileId } = useParams();

  useEffect(() => {
    if (!userInfo) navigate("/");
  }, [userInfo, navigate]);

  const handleChangePassword = async (formData, e) => {
    e.preventDefault();

    dispatch(changeUserPassword({ ...formData, userId: profileId }));
  };
  return (
    <>
      <Header />
      <section className="max-w-xl mx-auto">
        <div>
          <h1 className="font-extrabold text-[32px] text-[#222328]">
            Change Password
          </h1>

          <form
            onSubmit={handleSubmit(handleChangePassword)}
            className="mt-10 "
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-col  gap-2 mb-2">
                <label
                  htmlFor={"currentPass"}
                  className="block text-sm font-medium text-gray-900 "
                >
                  Current password:
                </label>
                <input
                  type="password"
                  {...register("currentPass", {
                    required: {
                      value: true,
                      message: "Please enter your current password",
                    },
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
                />
                <p className="mt-2 text-red-700 text-sm ">
                  {errors.currentPass?.message}
                </p>
              </div>
              <div className="flex flex-col  gap-2 mb-2">
                <label
                  htmlFor={"newPassword"}
                  className="block text-sm font-medium text-gray-900 "
                >
                  New password:
                </label>
                <input
                  type="password"
                  {...register("newPassword", {
                    required: {
                      value: true,
                      message: "Please enter your new password",
                    },
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
                />
                <p className="mt-2 text-red-700 text-sm ">
                  {errors.newPassword?.message}
                </p>
              </div>

              <div className="flex flex-col  gap-2 mb-2">
                <label
                  htmlFor={"confirmNewPassword"}
                  className="block text-sm font-medium text-gray-900 "
                >
                  Confirm new password:
                </label>
                <input
                  type="password"
                  {...register("confirmNewPassword", {
                    required: {
                      value: true,
                      message: "Please re-enter your new password",
                    },
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
                />
                <p className="mt-2 text-red-700 text-sm ">
                  {errors.confirmNewPassword?.message}
                </p>
              </div>

              <div className="mt-5 flex justify-between gap-5">
                <button
                  type="submit"
                  className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center  "
                >
                  Change password
                </button>
                {/* <div className="self-center jutify-end ">
                  <Link to="/">
                    <span className="text-gray-900 text-sm underline ">
                      Forget password?
                    </span>
                  </Link>
                </div> */}
              </div>
            </div>
          </form>
        </div>
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
      </section>
    </>
  );
};

export default ChangePassword;
