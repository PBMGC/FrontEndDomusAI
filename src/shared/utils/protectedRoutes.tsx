import { useAuthStore } from "@/user.store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;