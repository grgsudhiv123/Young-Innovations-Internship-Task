import Logo from "../components/icons/logo";
import CustomButton from "../components/ui/button";
import signinPageImg from "../assets/signinPage/signinimg.png";
import CustomFormField from "../components/ui/customInput";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { SigninConstants } from "../utils/constants/loginConstants";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, type SignInDataType } from "../schemas/auth.schema";
import { Controller, useForm } from "react-hook-form";
import { PageRoutes } from "../enum/routes";
import { useNavigate } from "react-router";
import { SignIn } from "../services/auth.services";
import { toast } from "react-toastify";
const SignInPage = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SignInSchema),
  });

  const navigate = useNavigate();

  const handleSignin = async (formValues: SignInDataType) => {
    try {
      await toast.promise(SignIn(formValues), {
        pending: "Signing in",
        success: "Successfully signed in",
        error: "Failed to sign in",
      });

      navigate(PageRoutes.HOME);
    } catch (error) {
      console.log("Signin error : ", error);
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
              onClick={() => (window.location.href = PageRoutes.SIGNUP)}
            >
              <span>Don’t have account?</span>
            </CustomButton>
            <CustomButton
              variant="light-primary"
              onClick={() => (window.location.href = PageRoutes.SIGNUP)}
            >
              <span>Create Account</span>
            </CustomButton>
          </div>
        </div>
      </nav>

      <div className="w-full h-full flex">
        <div className="flex-1 flex items-end bg-secondary-100">
          <img
            src={signinPageImg}
            className="w-full h-full aspect-square object-contain"
          />
        </div>
        <div className="flex-1 flex w-full h-full items-center justify-center">
          <form
            onSubmit={handleSubmit(handleSignin)}
            className="max-w-162 w-full flex flex-col gap-10"
          >
            <h1 className="text-heading-2 text-center">
              Sign in to your account
            </h1>
            <div className="flex flex-col gap-6">
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState }) => {
                  return (
                    <CustomFormField
                      label="Email"
                      type="email"
                      placeholder="Username or email address..."
                      onChange={field.onChange}
                      value={field.value}
                      error={fieldState.error?.message}
                    />
                  );
                }}
              />
              <Controller
                control={control}
                name="password"
                render={({ field, fieldState }) => {
                  return (
                    <CustomFormField
                      label="Password"
                      type="password"
                      placeholder="Password"
                      onChange={field.onChange}
                      value={field.value}
                      error={fieldState.error?.message}
                    />
                  );
                }}
              />
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
                    Remember me
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

export default SignInPage;
