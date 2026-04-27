import ListProduct from "./pages/ListProduct";
import Layout from "../../components/layouts/Layout"

const productRoutes = [

    {
        path: "/products",
        element: <Layout />,
        children: [
            { index: true, element: <ListProduct /> }
        ]
    }

]

export default productRoutes