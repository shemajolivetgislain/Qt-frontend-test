import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useState, useEffect } from "react";
import Input from "../../../components/Inputs";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="w-1/2 max-md:w-[80%]  h-fit  flex flex-col  py-20 px-20 gap-5 shadow-sm border-2 border-slate-100 rounded-md ">
      <header>
        <h1 className="font-bold text-whiteTheme-primaryColor text-2xl">
          Register
        </h1>
        <p className="text-sm text-gray-700">
          create account on Blogger Quicker to join our community
        </p>
      </header>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-3"
      >
        <Controller
          name="first_name"
          control={control}
          defaultValue=""
          rules={{ required: "First name is required" }}
          render={({ field }) => {
            return (
              <div className="flex flex-col gap-1">
                <label className="text-whiteTheme-textColor font-semibold text-base">
                  First Name
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter your first name"
                    {...field}
                    className={`!border-2 !border-slate-300 !pl-4`}
                  />
                </div>
                {errors.first_name && (
                  <p className="text-red-600 text-[13px]">
                    {errors.first_name.message}
                  </p>
                )}
              </div>
            );
          }}
        />
        <Controller
          name="last_name"
          control={control}
          defaultValue=""
          rules={{ required: "Last name is required" }}
          render={({ field }) => {
            return (
              <div className="flex flex-col gap-1">
                <label className="text-whiteTheme-textColor font-semibold text-base">
                  Last Name
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter your first name"
                    {...field}
                    className={`!border-2 !border-slate-300 !pl-4`}
                  />
                </div>
                {errors.last_name && (
                  <p className="text-red-600 text-[13px]">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            );
          }}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: "Email is required" }}
          render={({ field }) => {
            return (
              <div className="flex flex-col gap-1">
                <label className="text-whiteTheme-textColor font-semibold text-base">
                  Email
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter your email Address"
                    {...field}
                    className={`!border-2 !border-slate-300 !pl-4`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-600 text-[13px]">
                    {errors.email.message}
                  </p>
                )}
              </div>
            );
          }}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: "Password is required" }}
          render={({ field }) => {
            return (
              <div className="flex flex-col gap-1">
                <label className="text-whiteTheme-textColor font-semibold text-base">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...field}
                    className={`!border-2 !border-slate-300 !pl-4`}
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <LuEye size={18} className="" />
                    ) : (
                      <LuEyeOff size={18} className="" />
                    )}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-[13px]">
                    {errors.password.message}
                  </p>
                )}
              </div>
            );
          }}
        />
        <Button
          value={<span className="flex items-center">{"Sign In"}</span>}
          className={"!w-full"}
        />
        <span className="flex items-center gap-2">
          <p className="text-gray-600">Already have an account! </p>
          <p
            className="text-whiteTheme-primaryColor font-bold"
            onClick={() => {
              navigate("/register");
            }}
          >
            login
          </p>
        </span>
      </form>
    </div>
  );
}