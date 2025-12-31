import Logo from "../components/icons/logo";
import CustomButton from "../components/ui/button";
import signinPageImg from "../assets/signinPage/signinimg.png";
import CustomFormField from "../components/ui/customInput";
import { ArrowRightIcon } from "@phosphor-icons/react";
const SignInPage = () => {
  return (
    <div className="relative w-screen h-screen bg-white">
      <nav className="fixed top-0 w-full">
        <div className="max-w-340 w-full flex justify-between items-center mx-auto my-5">
          <Logo color="text-gray-900" />
          <div>
            <CustomButton variant="light-gray">
              <span>Don’t have account?</span>
            </CustomButton>
            <CustomButton variant="light-primary">
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
          <div className="max-w-162 w-full flex flex-col gap-10">
            <h1 className="text-heading-2 text-center">
              Sign in to your account
            </h1>
            <div className="flex flex-col gap-6">
              <CustomFormField
                label="Email"
                type="email"
                placeholder="Username or email address..."
              />
              <CustomFormField
                label="Password"
                type="password"
                placeholder="Password"
              />

              <div className="w-full flex justify-between">
                <div className="flex gap-2.5">
                  <input
                    type="checkbox"
                    id="vehicle1"
                    name="vehicle1"
                    value="Bike"
                    className="size-5.5 cursor-pointer outline-none border border-gray-100"
                  />
                  <label
                    htmlFor="vehicle1"
                    className="body-md-400 text-gray-700 cursor-pointer "
                  >
                    Remember me
                  </label>
                </div>

                <CustomButton className="w-fit">
                  <div className="flex gap-3 items-center">
                    <span>Sign in</span>
                    <ArrowRightIcon size={24} />
                  </div>
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
