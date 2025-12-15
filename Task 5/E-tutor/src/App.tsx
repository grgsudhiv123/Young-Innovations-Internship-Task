import "./App.css";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";
import { BellIcon } from "@phosphor-icons/react";
import Sidebar from "./components/common/sidebar";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="w-screen h-screen flex flex-row overflow-hidden">
      <Sidebar />
      <div className="w-full max-h-screen">
        <div className="max-w-330 w-full h-fit mx-auto my-6 flex justify-between items-center">
          <div className="flex flex-col gap-1.5">
            <span className="text-gray-600 body-md-500">Good Morning</span>
            <span className="body-xxl-600 text-gray-900">
              Create a new course
            </span>
          </div>
          <div className="flex flex-row gap-5 max-h-12 h-full w-fit">
            <div className="flex items-center bg-gray-50 px-4 py-3 gap-3 focus-within:ring-1 ring-gray-200 w-78 ">
              <MagnifyingGlassIcon size={24} />
              <input
                type="text"
                placeholder="Search"
                className="w-full outline-0 body-lg-400"
              />
            </div>

            <div className="body-lg-400 size-12 aspect-square flex items-center justify-center bg-gray-50">
              <BellIcon size={24} />
            </div>

            <div className="max-w-12 w-full h-12 aspect-square rounded-full overflow-hidden">
              <img
                src="../src/assets/navbar/dummyuserphoto.jpg"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        <div className="h-full w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
