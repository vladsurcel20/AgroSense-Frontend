import { Navigate, Outlet } from "react-router-dom";
import { useDashboard } from "../contexts/DashboardContext";

export const RequireLocation = () => {
  const { currentLocation } = useDashboard();
  return currentLocation ? <Outlet /> : <Navigate to="/dashboard/location" replace />;
};

export const RequireGreenhouse = () => {
  const { currentLocation, currentGreenhouse } = useDashboard();
  if (!currentLocation) return <Navigate to="/dashboard/location" replace />;
  if (!currentGreenhouse) return <Navigate to="/dashboard/location/greenhouse" replace />;
  return <Outlet />;
};