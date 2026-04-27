import { useRoutes } from "react-router-dom";
import { dashboardRoutes } from "../modules/dashboard/routes"

export default function AppRoutes() {
  return useRoutes([...dashboardRoutes])
}
