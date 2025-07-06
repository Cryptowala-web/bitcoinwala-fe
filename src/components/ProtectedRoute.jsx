
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

    if (!user) {
        return <Navigate to="/" replace />;
    }

    console.log("user", user)
    if (user.role!=='admin' && user.role!=='super_admin') {
        console.log("user role", user.role)
        return <Navigate to="/unauthorized" replace />;
    }

  return <>{children}</>;
};

export default ProtectedRoute;
