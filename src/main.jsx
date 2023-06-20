import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Welcome from "./components/welcome";
import Routines from "./components/routines";
import My_Routines from "./components/my_routines";
import Activities from "./components/activities";
import Login from "./components/login";
import Register from "./components/register";
import UpdateRoutine from "./components/update_routine";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "/routines",
        element: <Routines />,
      },
      {
        path: "/my-routines",
        element: <My_Routines />,
      },
      {
        path: "/activities",
        element: <Activities />,
      },
      {
        path: "/:routineId",
        element: <UpdateRoutine />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
