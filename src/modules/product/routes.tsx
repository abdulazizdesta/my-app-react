import ListProduct from "./pages/ListProduct";
import Layout from "../../components/layouts/Layout"
import EditProducts from "./pages/EditProducts";
import ProtectedRoute from "../../routes/ProtectedRoute";

const productRoutes = [
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/products",
                element: <Layout />,
                children: [
                    { index: true, element: <ListProduct /> },
                    {
                        path: '/products/edit/:id',
                        element: <EditProducts />
                    }
                ]
            }
        ]
    }

]

export default productRoutes