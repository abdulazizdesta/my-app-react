import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    image: string;
    description: string;
}

export default function EditProducts() {
    const id = useParams().id
    const navigate = useNavigate()
    const [_products, setProducts] = useState<Product>({
        id: 0,
        name: "",
        price: 0,
        stock: 0,
        image: "",
        description: "",
    });
    const [formProduct, setFormProduct] = useState<any>({})

    const handleChange = (e: any) => {
        setFormProduct({
            ...formProduct,
            [e.target.name]: e.target.value,
        });
    };

    const fetchProducts = async () => {
        try {
            const response = await axios({
                method: "GET",
                url: "http://localhost:8000/api/products/" + id,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log(response, "response");

            await setProducts(response.data.data);
            await setFormProduct(response.data.data);
        } catch (error) {
            console.log(error, "error");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [id]);

    const handleSubmitUpdate = async () => {
        try {
            const response = await axios({
                method: "PUT",
                url: "http://localhost:8000/api/products/" + id,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                data: formProduct,
            });
            console.log(response, "response");
            navigate('/products')
        } catch (error) {
            console.log(error, "error");
        }
    }

    return (
        <>
            <div>
                Edit Products
            </div>
            <div>
                {/* FORMULIR PRODUCT */}
                <div className="my-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                        onChange={handleChange}
                        defaultValue={formProduct.name}
                    />
                </div>
                <div className="my-3">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                        type="number"
                        name="price"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                        onChange={handleChange}
                        defaultValue={formProduct.price}
                    />
                </div>
                <div className="my-3">
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                    <input
                        type="number"
                        name="stock"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                        onChange={handleChange}
                        defaultValue={formProduct.stock}
                    />
                </div>
                <div className="my-3">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <input
                        type="text"
                        name="description"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                        onChange={handleChange}
                        defaultValue={formProduct.description}
                    />
                </div>
                <div className="my-3">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                    <input
                        type="text"
                        name="image"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                        onChange={handleChange}
                        defaultValue={formProduct.image}
                    />
                </div>

                <div className='my-4'>
                    <button 
                        className='bg-indigo-400 opacity-80 hover:bg-indigo-500 cursor-pointer text-white py-2 px-4 rounded'
                        onClick={handleSubmitUpdate}>
                        Update
                    </button>
                </div>
            </div>
        </>
    )
}
