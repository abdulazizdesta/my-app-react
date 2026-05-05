import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import ModalConfirmation from "../../../components/ModalConfirmation";
import { useNavigate } from "react-router-dom";

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
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [perPage, setPerPage] = useState<number>(10)
  const [id, setId] = useState<any>(null)
  const navigate = useNavigate()
  const [pager, setPager] = useState<number>(1)
  const [maxPage, setMaxPage] = useState<number>(1)

  const fetchProducts = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:8000/api/products?perPage=" + perPage + "&page=" + pager,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response, "response");

      await setProducts(response.data.data.data);
      await setMaxPage(response.data.data.meta.last_page);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [perPage, pager]);

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

  const handleModalDelete = (id: number) => {
    setId(id)
    setOpenModalDelete(true)
  }

  const handlePerPage = (e: any) => {
    setPerPage(e.target.value)
  }

  const setCurrentPage = (page: number) => {
    setPager(page)
  }

  const handleDeleteProduct = async () => {
    try {
      await axios({
        method: "DELETE",
        url: `http://localhost:8000/api/products/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      fetchProducts()
      setOpenModalDelete(false)
    }catch(error){
      console.log(error, 'error')
    }
  }

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
                  <button 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded cursor-pointer"
                  onClick={() => navigate(`/products/edit/${product.id}`)}>
                    Edit
                  </button>
                  <button 
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded cursor-pointer"
                  onClick={() => handleModalDelete(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end items-center mt-4 gap-4">
          <form className="w-32">
            <label htmlFor="countries" className="sr-only">
              Select an option
            </label>
            <select
              id="countries"
              className="block w-full px-3 py-2 bg-neutral-secondary-medium border border-default-medium text-heading text-sm leading-4 rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body rounded-lg"
              onChange={handlePerPage}
            >
              <option value={10}>10 per page</option>
              <option value="25">25 per page</option>
              <option value="50">50 per page</option>
              <option value="100">100 per page</option>
            </select>
          </form>
          <ul className="flex items-center justify-end -space-x-px text-sm">
            <li>
              <a
                onClick={() => setPager(pager -1)}
                className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-indigo-500 hover:text-white hover:text-heading font-medium rounded-s-base text-sm px-3 h-9 focus:outline-none rounded-l-lg hover:cursor-pointer hover:border-indigo-500"
              >
                Previous
              </a>
            </li>

            {Array.from({length: maxPage}, (_, i) => i + 1).map((page) => (
              <li key={page}>
                <a
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentPage(page)
                  }}

                  className={`flex items-center justify-center text-sm px-3 h-9 border rounded-s-base cursor-pointer 
                    ${
                      pager === page 
                      ? "bg-indigo-500 text-white border-indigo-500"
                      : "bg-white hover:bg-indigo-500 border-indigo-500 hover:text-white"}`}
                >
                  {page}
                </a>
              </li>
            ))}

            {/* <li>
              <a
                href="#"
                className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-indigo-500 hover:text-white hover:text-heading font-medium rounded-s-base text-sm px-3 h-9 focus:outline-none hover:cursor-pointer hover:border-indigo-500"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-indigo-500 hover:text-white hover:text-heading font-medium rounded-s-base text-sm px-3 h-9 focus:outline-none  hover:cursor-pointer hover:border-indigo-500"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-indigo-500 hover:text-white hover:text-heading font-medium rounded-s-base text-sm px-3 h-9 focus:outline-none  hover:cursor-pointer hover:border-indigo-500"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-indigo-500 hover:text-white hover:text-heading font-medium rounded-s-base text-sm px-3 h-9 focus:outline-none  hover:cursor-pointer hover:border-indigo-500"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-indigo-500 hover:text-white hover:text-heading font-medium rounded-s-base text-sm px-3 h-9 focus:outline-none  hover:cursor-pointer hover:border-indigo-500"
              >
                5
              </a>
            </li> */}
            <li>
              <a
                onClick={() => setPager(pager + 1)}
                className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-indigo-500 hover:text-white hover:text-heading font-medium rounded-s-base text-sm px-3 h-9 focus:outline-none rounded-r-lg hover:cursor-pointer hover:border-indigo-500"
              >
                Next
              </a>
            </li>
          </ul>
        </div>
      </div>

      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleSubmit={handleSubmitProduct}
        handleChange={handleChangeProduct}
        title="Add Product"
      />

      <ModalConfirmation
        openModal={openModalDelete}
        setOpenModal={setOpenModalDelete}
        handleSubmit={handleDeleteProduct}
        description="Are you sure want to delete Product"
        title="Delete Product"
      />
    </>
  )
}
