import { createBrowserRouter } from "react-router-dom";
import Layout from "./component/Layout";
import Errorpage from "./component/Errorpage";
import HomePage from "./component/HomePage";
import LoginPage from "./component/login/LoginPage";
import UserPage from "./users/UserPage";
import UserDetails from "./users/UserDetails";
import Register from "./component/Register/Register";
import MesAdresse from "./component/Adresse/MesAdresse";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Errorpage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <Register /> },
      {path: "/mes-adresses", element: <MesAdresse />},
      {
        path: "users",
        element: <UserPage />,
        children: [{ path: ":id", element: <UserDetails /> }],
      },
    ],
  },
]);

export default router;
