import "./App.css";
import Sidebar from "./components/common/sidebar";
import { Outlet } from "react-router";
import TopNavbar from "./components/common/topNavbar";
import FooterComp from "./components/common/footer";

function App() {
  return (
    <div className="w-screen h-screen flex flex-row ">
      <Sidebar />
      <div className="relative w-full h-full overflow-y-scroll scrollBar">
        <TopNavbar />
        <main className=" h-full w-full bg-gray-50 pt-36 flex flex-col ">
          <Outlet />
          <FooterComp />
        </main>
      </div>
    </div>
  );
}

export default App;
