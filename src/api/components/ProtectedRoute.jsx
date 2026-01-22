import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token"); // or authToken

  // ❌ If not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // ✅ If logged in
  return <Outlet />;
};

export default ProtectedRoute;


