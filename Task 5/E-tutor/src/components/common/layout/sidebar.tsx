import { Link, useLocation } from "react-router";
import { SidebarConstant } from "../../../utils/constants/sidebarConstants";
import Logo from "../../icons/logo";
import { PageRoutes } from "../../../enum/routes";
import { SignOutIcon } from "@phosphor-icons/react";

const Sidebar = () => {
  const location = useLocation();
  const activeStyle = "bg-primary-500 text-white";
  const inActiveStyle = "text-gray-500 hover:bg-gray-800";

  if (!SidebarConstant || SidebarConstant.length === 0) {
    return null;
  }
  return (
    <div className="max-w-70.5 w-full h-full bg-gray-900 hidden md:flex flex-col justify-between">
      <div className="w-full h-fit">
        <div className="py-5 pl-6 border-b border-gray-700 mb-4">
          <Link to={PageRoutes.HOME}>
            <Logo className="w-28.5 h-7.5" />
          </Link>
        </div>
        <div className="flex flex-col">
          {SidebarConstant.map((link, key) => {
            const isActive = link.path === location.pathname;
            return (
              <Link
                to={link.path}
                key={key}
                className={`flex justify-between px-6 py-3 cursor-pointer transition-colors duration-200 ease-in-out ${
                  isActive ? activeStyle : inActiveStyle
                }`}
              >
                <span className="flex flex-row gap-3">
                  {link.icon}
                  <span className="body-md-500">{link.title}</span>
                </span>
                {link.path === "/message" && (
                  <span className="size-6 rounded-full flex items-center justify-center body-sm-500 bg-primary-500 text-white">
                    3
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
      <button
        type="button"
        className="w-full flex justify-start gap-3 px-6 py-3 cursor-pointer transition-colors duration-200 ease-in-out text-gray-500 hover:bg-gray-800 float-end mb-6"
      >
        <SignOutIcon size={24} />
        <span className="body-md-500">Sign-out</span>
      </button>
    </div>
  );
};

export default Sidebar;
