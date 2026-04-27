import { Outlet } from "react-router-dom";
import Header from './Header'
import Sidebar from "./sidebar";

export default function Layout() {
    return (
        <>
            <div>
                <Header />

                <div className="flex h-screen">
                    {/* Sidebar */}
                    <Sidebar/>
                    {/* Content */}
                    <div className="bg-gray-100 w-full p-6">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>
    );
}