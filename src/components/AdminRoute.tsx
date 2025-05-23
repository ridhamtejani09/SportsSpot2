import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, isAdmin, isLoading } = useAuth();
  
  useEffect(() => {
    console.log("AdminRoute - User:", user);
    console.log("AdminRoute - Is Admin:", isAdmin);
    console.log("AdminRoute - Is Loading:", isLoading);
  }, [user, isAdmin, isLoading]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sport-purple"></div>
      </div>
    );
  }
  
  if (!user) {
    console.log("AdminRoute - No user, redirecting to home");
    return <Navigate to="/" replace />;
  }

  if (!isAdmin) {
    console.log("AdminRoute - User is not admin, redirecting to home");
    return <Navigate to="/" replace />;
  }

  console.log("AdminRoute - Rendering admin content");
  return <>{children}</>;
};

export default AdminRoute;
