import useUserQuery from "@/hooks/useUserQuery";
import ErrorPage from "@/components/components/ErrorPage";
import { Navigate, Outlet } from "react-router";
import LoadingScreen from "../components/LoadingScreen";

export default function ProtectedRouteLayout() {
  const { isLoading, isError, data, error } = useUserQuery();
  if (isLoading) {
    return <LoadingScreen />;
  }
  if (isError) {
    return <ErrorPage error={error?.message as string} />;
  }
  if (!data.user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
