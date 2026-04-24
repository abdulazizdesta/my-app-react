// import React from "react";
import { useState } from "react";
import axios from "axios";

interface formLogin{
  email: string;
  password: string;
}

export default function App() {
  const [formLogin, setFormLogin] = useState<formLogin>({
    email: "",
    password: "",
  })
  const handleChange = (e: any) =>{
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e: any) =>{
    e.preventDefault();
    try{
      const response = await axios({
        method: "POST",
        url: "http://localhost:8000/api/auth/login",
        data: formLogin
      })
      console.log(response, ":response");
    }catch(error){
      console.log(error);
    }
  }

  console.log(formLogin);
  return (
    <>
      <div className="bg-white">
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
            className="pointer bg-blue-500 text-white py-2 px-4 rounded-lg w-[40%]" 
            onClick={handleSubmit}>Login</button>
          </div>
        </div>
      </div>
    </>
  );
}