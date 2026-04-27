import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

interface FormLogin {
  email: string
  password: string
}

export default function App() {
  const [form, setForm] = useState<FormLogin>({
    email: "",
    password: "",
  });
  const navigate = useNavigate()

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8000/api/auth/login",
        data: form,
      });

      localStorage.setItem("token", response.data.data.token);
      toast.success('Login Success')
      navigate('/dashboard')
    } catch (error) {
      console.error(error, 'Error');
      toast.error('Login Failed')
    }
  };
  return (
    <>
      <div className="flex flexbox h-screen">

        {/* left */}
        <div className="bg-slate-700 w-full flex justify-center items-center">
          <div className="bg-white shadow w-full mx-6 lg:mx-32 p-8 rounded-xl">
            <h1 className="color-slate-900 text-5xl mb-1 font-['Cormorant_Garamond']">Login</h1>
            <p className="text-gray-500 font-['DM Sans] mb-4">
              Please enter your email and password
            </p>
            <div className="flex flex-col gap-2 mb-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="youremail@email.com"
                className="border border-gray-400 px-2 py-2 mb-2 w-full rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Enter your password"
                className="border border-gray-400 px-2 py-2 mb-2 w-full rounded-xl"
              />
            </div>
            <div className="flex justify-center gap-4">
              <button 
                className="bg-slate-600 text-white p-2 w-full rounded-xl mt-8 cursor-pointer"
                onClick={handleSubmit}
                disabled={loading}>
                Log in
              </button>

            </div>
          </div>
        </div>


        {/* right */}
        <div className="flex-col w-full justify-center items-center hidden md:flex">
          <h1 className="text-gray-500 text-8xl font-bold font-['Cormorant_Garamond']">Seraya</h1>
          <br />
          <p className="text-gray-500 italic" >"Wear your story"</p>
        </div>

      </div >
      <ToastContainer/>
    </>
  )
}