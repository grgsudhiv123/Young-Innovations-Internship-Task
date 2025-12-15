import { createBrowserRouter } from "react-router";
import App from "../App";
import DashboardPage from "../pages/dashboardPage";
import NewCoursePage from "../pages/newCoursePage";
import SettingPage from "../pages/settingPage";
import MessagePage from "../pages/messagePage";
import EarningPage from "../pages/earningPage";
import MyCoursesPage from "../pages/myCoursesPage";
import { PageRoutes } from "../enum/routes";

const router = createBrowserRouter([
  {
    path: PageRoutes.HOME,
    Component: App,
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
      {
        path: PageRoutes.CREATE_NEW_COURSE,
        Component: NewCoursePage,
      },
      {
        path: PageRoutes.MY_COURSE,
        Component: MyCoursesPage,
      },
      {
        path: PageRoutes.EARNING,
        Component: EarningPage,
      },
      {
        path: PageRoutes.MESSAGE,
        Component: MessagePage,
      },
      {
        path: PageRoutes.SETTING,
        Component: SettingPage,
      },
    ],
  },
]);

export default router;
