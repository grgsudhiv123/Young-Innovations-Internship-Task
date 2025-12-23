import "./App.css";
import Sidebar from "./components/common/layout/sidebar";
import { Outlet } from "react-router";
import FooterComp from "./components/common/layout/footer";
import TopNavbar from "./components/common/layout/topNavbar";

function App() {
  return (
    <div className="w-full h-screen flex flex-row ">
      <Sidebar />
      <div className="relative w-full h-full overflow-y-scroll scrollBar bg-gray-50 ">
        <TopNavbar />
        <main className="h-full w-full pt-40 flex flex-col space-y-10">
          <Outlet />
          <FooterComp />
        </main>
      </div>
    </div>
  );
}

export default App;
