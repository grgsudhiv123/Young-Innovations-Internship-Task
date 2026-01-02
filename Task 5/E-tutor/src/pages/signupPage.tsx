import Logo from "../components/icons/logo";
import CustomButton from "../components/ui/button";
import signupImg from "../assets/signinPage/signupimg.png";
import CustomFormField from "../components/ui/customInput";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { SigninConstants } from "../utils/constants/loginConstants";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, type SignupDataType } from "../schemas/auth.schema";
import { Controller, useForm } from "react-hook-form";
import { SignUp } from "../services/auth.services";
import { PageRoutes } from "../enum/routes";
import { toast } from "react-toastify";
import { Navigate } from "react-router";
const SignUpPage = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      fullname: {
        firstName: "",
        lastName: "",
      },
      username: "",
      password: "",
      email: "",
      confirmpassword: "",
    },
    resolver: zodResolver(SignUpSchema),
  });

  const handleSignUp = async (formValues: SignupDataType) => {
    try {
      await toast.promise(SignUp(formValues), {
        pending: "Signing in new user",
        success: "Signed in successfully",
        error: "Sign in failed",
      });

      return <Navigate to={PageRoutes.SIGNIN} replace />;
    } catch (error) {
      console.log("Signup error : ", error);
    }
  };
  return (
    <div className="relative w-screen h-screen bg-white">
      <nav className="fixed top-0 w-full">
        <div className="max-w-340 w-full flex justify-between items-center mx-auto my-5">
          <Logo color="text-gray-900" />
          <div>
            <CustomButton
              variant="light-gray"
              onClick={() => (window.location.href = PageRoutes.SIGNIN)}
            >
              <span>Already have account?</span>
            </CustomButton>
            <CustomButton
              variant="light-primary"
              onClick={() => (window.location.href = PageRoutes.SIGNIN)}
            >
              <span>Sign In</span>
            </CustomButton>
          </div>
        </div>
      </nav>

      <div className="w-full h-full flex">
        <div className="flex-1 flex items-end bg-secondary-100">
          <img
            src={signupImg}
            className="w-full h-full aspect-square object-contain"
          />
        </div>
        <div className="flex-1 flex w-full h-full items-center justify-center">
          <form
            onSubmit={handleSubmit(handleSignUp)}
            className="max-w-162 w-full flex flex-col gap-10"
          >
            <h1 className="text-heading-2 text-center">Create your account </h1>
            <div className="w-full flex flex-col gap-6">
              <div className="w-full flex items-end gap-4.5">
                <Controller
                  control={control}
                  name={`fullname.firstName`}
                  render={({ field, fieldState }) => {
                    return (
                      <CustomFormField
                        label="Full Name"
                        type="text"
                        placeholder="First name..."
                        onChange={field.onChange}
                        value={field.value}
                        error={fieldState.error?.message}
                      />
                    );
                  }}
                />
                <Controller
                  control={control}
                  name={`fullname.lastName`}
                  render={({ field, fieldState }) => {
                    return (
                      <CustomFormField
                        label=""
                        type="text"
                        placeholder="Last name..."
                        onChange={field.onChange}
                        value={field.value}
                        error={fieldState.error?.message}
                      />
                    );
                  }}
                />
              </div>
              <Controller
                control={control}
                name="username"
                render={({ field, fieldState }) => {
                  return (
                    <CustomFormField
                      label="Username"
                      type="text"
                      placeholder="Username..."
                      onChange={field.onChange}
                      value={field.value}
                      error={fieldState.error?.message}
                    />
                  );
                }}
              />
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState }) => {
                  return (
                    <CustomFormField
                      label="Email"
                      type="email"
                      placeholder="Email address"
                      onChange={field.onChange}
                      value={field.value}
                      error={fieldState.error?.message}
                    />
                  );
                }}
              />
              <div className="w-full flex items-end gap-4.5">
                <Controller
                  control={control}
                  name="password"
                  render={({ field, fieldState }) => {
                    return (
                      <CustomFormField
                        label="Password"
                        type="password"
                        placeholder="Create Password"
                        onChange={field.onChange}
                        value={field.value}
                        error={fieldState.error?.message}
                      />
                    );
                  }}
                />
                <Controller
                  control={control}
                  name="confirmpassword"
                  render={({ field, fieldState }) => {
                    return (
                      <CustomFormField
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm Password"
                        onChange={field.onChange}
                        value={field.value}
                        error={fieldState.error?.message}
                      />
                    );
                  }}
                />
              </div>
              <div className="w-full flex justify-between">
                <div className="flex gap-2.5">
                  <input
                    type="checkbox"
                    id="signin"
                    name="signin"
                    value="Bike"
                    className="size-5.5 cursor-pointer outline-none border border-gray-100"
                  />
                  <label
                    htmlFor="signin"
                    className="body-md-400 text-gray-700 cursor-pointer "
                  >
                    I Agree with all of your{" "}
                    <a href="#" className="text-secondary-500">
                      Terms & Conditions
                    </a>
                  </label>
                </div>

                <CustomButton type="submit" className="w-fit">
                  <div className="flex gap-3 items-center">
                    <span>Sign in</span>
                    <ArrowRightIcon size={24} />
                  </div>
                </CustomButton>
              </div>
            </div>
            <div className="w-full space-y-6">
              <div className="relative w-full h-auto">
                <div className="border w-full border-gray-100 my-1.5"></div>
                <span className="absolute left-[50%] -translate-x-1/2 top-0 -translate-y-1/2 text-label-lg text-gray-500 px-2 bg-white">
                  SIGN IN WITH
                </span>
              </div>
              <div className="grid grid-cols-12 gap-6">
                {SigninConstants.map((item, i) => {
                  return (
                    <button
                      type="button"
                      key={i}
                      onClick={() => (window.location.href = item.link)}
                      className="col-span-4 flex flex-row cursor-pointer hover:bg-gray-50 border border-gray-100 transform-all ease-in-out duration-200"
                    >
                      <span className="size-11 flex items-center justify-center shrink-0">
                        {item.icon}
                      </span>
                      <div className="flex-1 flex items-center justify-center border-l border-gray-100">
                        <span>{item.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
