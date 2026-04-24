// import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

interface formLogin {
  email: string;
  password: string;
}

interface poducts {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export default function App() {
  const [formLogin, setFormLogin] = useState<formLogin>({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<poducts[]>([]);
  const handleChange = (e: any) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:8000/api/auth/login",
        data: formLogin
      })
      console.log(response, ":response");
      localStorage.setItem("token", response.data.data.token);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: 'http://localhost:8000/api/products',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setProducts(response.data.data.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  console.log(formLogin);
  return (
    <>
      <div className="bg-blue-500 p-5">
        <h1>Login</h1>
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-4 w-96 flex items-center">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formLogin.email}
              onChange={handleChange}
              className="border border-grey-500 rounded-lg w-[80%]"
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formLogin.password}
              onChange={handleChange}
              className="border border-grey-500 rounded-lg w-[80%]" />
            <button
              className="pointer bg-blue-500 text-white py-2 px-4 rounded-lg w-[40%] hover:bg-blue-600 cursor-pointer"
              onClick={handleSubmit}>Login</button>
          </div>
        </div>

        <h1>Products</h1>
        <div className="bg-blue-500 p-5">
          <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold">{product.name}</h2>
                <p>Price: {product.price}</p>
                <p>Stock: {product.stock}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}