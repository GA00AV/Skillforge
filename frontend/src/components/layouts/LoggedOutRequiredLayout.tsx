import { useUserContext } from "@/context/UserContext";
import ErrorPage from "@/pages/ErrorPage";
import { Navigate, Outlet } from "react-router";

export default function LoggedOutRequiredLayout() {
  const userQuery = useUserContext();
  if (userQuery.isLoading) {
    return <p>Loading...</p>;
  }
  if (userQuery.isError) {
    return <ErrorPage />;
  }
  if (userQuery.data.user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
