import { createBrowserRouter } from "react-router";
import App from "../App";
import DashboardPage from "../pages/dashboardPage";
import NewCoursePage from "../pages/newCoursePage";
import SettingPage from "../pages/settingPage";
import MessagePage from "../pages/messagePage";
import EarningPage from "../pages/earningPage";
import MyCoursesPage from "../pages/myCoursesPage";
import { PageRoutes } from "../enum/routes";
import NotFoundPage from "../pages/notFoundPage";
import SignInPage from "../pages/signinPage";
import SignUpPage from "../pages/signupPage";
import ProtectedRoutes from "../pages/protectedRoutes";
import RedirectIfLoggedin from "../utils/redirectIfLoggedin";
import RequireAuth from "../utils/requireAuth";
import { UserRole } from "../utils/constants/userrole.constants";
import CompleteFormPreview from "../components/forms/formDetail";

const router = createBrowserRouter([
  {
    path: PageRoutes.HOME,
    Component: App,
    children: [
      {
        Component: ProtectedRoutes,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: PageRoutes.CREATE_NEW_COURSE,
            element: (
              <RequireAuth validUsers={[UserRole.ADMIN, UserRole.SUPER_ADMIN]}>
                <NewCoursePage />,
              </RequireAuth>
            ),
            children: [
              {
                path: PageRoutes.CREATE_NEW_COURSE_FORM_DETAIL,
                element: <CompleteFormPreview />,
              },
            ],
          },
          {
            path: PageRoutes.MY_COURSE,
            element: <MyCoursesPage />,
          },
          {
            path: PageRoutes.EARNING,
            element: <EarningPage />,
          },
          {
            path: PageRoutes.MESSAGE,
            element: <MessagePage />,
          },
          {
            path: PageRoutes.SETTING,
            element: <SettingPage />,
          },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
  {
    path: PageRoutes.SIGNIN,
    element: (
      <RedirectIfLoggedin>
        <SignInPage />
      </RedirectIfLoggedin>
    ),
  },
  {
    path: PageRoutes.SIGNUP,
    element: (
      <RedirectIfLoggedin>
        <SignUpPage />
      </RedirectIfLoggedin>
    ),
  },
]);

export default router;
