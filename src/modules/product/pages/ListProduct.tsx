import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../../../components/Modal";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  description: string;
}

export default function ListProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [formProduct, setFormProduct] = useState<any>({})

  const fetchProducts = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:8000/api/products",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response, "response");

      await setProducts(response.data.data.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChangeProduct = (e: any) => {
    setFormProduct({
      ...formProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitProduct = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:8000/api/products",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: formProduct,
      });
      console.log(response, "response");
      fetchProducts();
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <>
      <h1>Products</h1>
      <div className="bg-white mt-4 p-4 shadow rounded-lg">
        <div className="text-end">
          <button className="text-md bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded hover:cursor-pointer"
            onClick={() => setOpenModal(true)}>
            Add Product
          </button>
        </div>
        <table className="mt-8 w-full">
          <thead className="border border-gray-300">
            <tr className="border border-gray-300">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Stock</th>
              <th className="border border-gray-300 p-2">Image</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}
                className={`${index % 2 === 0 ? "bg-gray-200 hover:bg-gray-300" : "hover:bg-gray-300"}`}>
                <td className="border border-gray-300 p-2">{product.name}</td>
                <td className="border border-gray-300 p-2">{product.price}</td>
                <td className="border border-gray-300 p-2">{product.stock}</td>
                <td className="border border-gray-300 p-2">{product.image}</td>
                <td className="border border-gray-300 p-2">{product.description}</td>
                <td className="border border-gray-300 p-2 flex gap-4">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded cursor-pointer">
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded cursor-pointer">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleSubmit={handleSubmitProduct}
        handleChange={handleChangeProduct}
        title="Add Product"
      />
    </>
  )
}
