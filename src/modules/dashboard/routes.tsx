import Dashboard  from "./pages/Dashboard";
import Layout from "../../components/layouts/Layout"

const dashboardRoutes = [

    {
        path: "/dashboard",
        element: <Layout />,
        children: [
            { index: true, element: <Dashboard /> }
        ]
    }

]

export default dashboardRoutes