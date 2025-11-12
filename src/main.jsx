import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./layout/RootLayout.jsx";
import Home from "./pages/Home.jsx";
import Bills from "./pages/Bills.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import MyPayBills from "./pages/MyPayBills.jsx";
import PrivateRoute from "./Provider/PrivateRoute.jsx";
import BilDetails from "./components/BilDetails.jsx";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/NotFound.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,

    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/bills",
        Component: Bills,
      },
      {
        path: "/bilDetails/:id",
        element: (
          <PrivateRoute>
            <BilDetails></BilDetails>
          </PrivateRoute>
        ),
        // loader: ({ params }) =>
        //   fetch(`http://localhost:3000/bills/${params.id}`),
      },
      {
        path: "/myBills",
        element: (
          <PrivateRoute>
            <MyPayBills></MyPayBills>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
