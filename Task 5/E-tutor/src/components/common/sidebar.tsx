import { useLocation } from "react-router";
import { SidebarConstant } from "../../utils/constants/sidebarConstants";
import Logo from "../icons/logo";

const Sidebar = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className="max-w-70.5 w-full bg-gray-900">
      <div className="py-5 pl-6 border-b border-gray-700 mb-4">
        <Logo className="w-28.5 h-7.5" />
      </div>
      <div className="flex flex-col">
        {SidebarConstant.map((link, key) => {
          return (
            <button
              type="button"
              key={key}
              className="flex flex-start gap-3 pl-6 py-3 text-white cursor-pointer hover:bg-gray-800 transition-colors duration-200 ease-in-out"
            >
              {link.icon}
              <span className="body-md-500 text-white">{link.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
