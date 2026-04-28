import { Outlet } from "react-router-dom";
import Header from './Header'
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function Layout() {
    const [open, setOpen] = useState<boolean>(true)
    return (
        <>
            <div>
                <Header onToggle={() => setOpen(!open)} />

                <div className="flex h-screen">
                    {/* Sidebar */}
                    <Sidebar open={open} />
                    {/* Content */}
                    <div className="bg-gray-100 w-full p-6">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>
    );
}