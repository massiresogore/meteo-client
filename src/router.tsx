import { createBrowserRouter } from "react-router-dom";
import Layout from "./component/Layout";
import Errorpage from "./component/Errorpage";
import HomePage from "./component/HomePage";
import LoginPage from "./component/LoginPage";
import PrivateRoute from "./PrivateRoute";
import UserPage from "./users/UserPage";
import UserDetails from "./users/UserDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Errorpage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "users",
        element: <UserPage />,
        children: [{ path: ":id", element: <UserDetails /> }],
      },
    ],
  },
]);

export default router;
