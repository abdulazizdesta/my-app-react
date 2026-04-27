import { useState } from "react"

export default function Header() {
    const [open, setOpen] = useState<boolean>(true);

    return (
        <>
            {/* Header */}
            <header className="bg-indigo-400 opacity-80">
                <div className="mx-4 flex justify-between h-12 items-center">
                    <div className="text-xl text-white w-1/4">Qee Market Place</div>
                    <div className="flex w-full justify-between">
                        <div className="cursor-pointer" onClick={() => setOpen(!open)}>
                            <div className="bg-white h-1 w-8 mb-2"></div>
                            <div className="bg-white h-1 w-8 mb-2"></div>
                            <div className="bg-white h-1 w-8"></div>
                        </div>
                        <button>Logout</button>
                    </div>
                </div>
            </header>
        </>
    )
}