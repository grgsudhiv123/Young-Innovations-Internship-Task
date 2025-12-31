import Logo from "../components/icons/logo";
import CustomButton from "../components/ui/button";
import notfoundimg from "../assets/notfoundpage/404.png";
const NotFoundPage = () => {
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
        <div className="flex-1 flex w-full h-full items-center justify-center">
          <div className="max-w-134 w-full flex flex-col gap-8">
            <h1 className="text-display-1 text-gray-100">Error 404</h1>
            <h2 className="text-heading-1">Oops! page not found</h2>
            <p className="body-xxl-400">
              Something went wrong. It’s look that your requested could not be
              found. It's look like the link is broken or the page is removed.
            </p>
            <CustomButton className="w-fit">
              <span>Go Back</span>
            </CustomButton>
          </div>
        </div>
        <div className="flex-1 flex items-center">
          <img
            src={notfoundimg}
            className="w-full h-full aspect-square object-contain"
          />
        </div>
      </div>

      <footer className="fixed bottom-0 w-full">
        <div className="max-w-340 w-full flex justify-between items-center mx-auto my-6">
          <p>
            © 2021 - Eduguard. Designed by Templatecookie. All rights reserved
          </p>
          <ul className="flex flex-row gap-6">
            <li>FAQs</li>
            <li>Privacy Policy</li>
            <li>Terms & Condition</li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default NotFoundPage;
