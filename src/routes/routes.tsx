import Layout from "@/shared/components/layaout/layaout";
import { lazy } from "react";
import InventarioRoutes from "./inventario";
import MovimientoRoutes from "./movimiento";
import InicioRoute from "./inicio";
import ProtectedRoute from "@/shared/utils/protectedRoutes";

const LoginView = lazy(() => import("../pages/auth/login"));
const RegisterView = lazy(() => import("../pages/auth/register"));
const Error = lazy(() => import("../shared/components/error/error"));


export const routes = [
  {
    path: "/",
    element: <LoginView />,
  },
  {
    path: "/register",
    element: <RegisterView />,
  },
  {
    path: "/app",
    element: <ProtectedRoute />, 
    children: [
      {
        path: "",
        element: <Layout />,
        children: [...InicioRoute,...InventarioRoutes, ...MovimientoRoutes],
      },
    ],
  },
  {
    path:"*",
    element:<Error/>
  }
];
