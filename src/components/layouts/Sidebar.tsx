import { Link } from "react-router-dom"
// import { useState } from "react"

interface SidebarProps{
    open: boolean
}

export default function Sidebar({open} : SidebarProps) {
    // const [open, setOpen] = useState<boolean>(true);
    const url = window.location.pathname;

    return (
        <>
            {/* Sidebar */}
            <div
                className={
                    `bg-white py-6` +
                    (open
                        ? " w-1/4 delay-300 duration-400 ease-in-out"
                        : " w-0 delay-300 duration-400 ease-in-out")
                }
            >
                <nav className="flex flex-col gap-4">
                    <Link
                        to="/dashboard"
                        className={`px-4 py-2 hover:text-white hover:bg-indigo-400 ${url == "/dashboard" ? "bg-indigo-400 text-white" : ""}`}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/products"
                        className={`px-4 py-2 hover:text-white hover:bg-indigo-400 ${url == "/products" ? "bg-indigo-400 text-white" : ""}`}
                    >
                        Product
                    </Link>
                    <Link
                        to="/profile"
                        className={`px-4 py-2 hover:text-white hover:bg-indigo-400 ${url == "/profile" ? "bg-indigo-400 text-white" : ""}`}
                    >
                        Profile
                    </Link>
                </nav>
            </div>
        </>
    )
}