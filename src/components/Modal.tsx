interface ModalProps {
    title: string
    openModal: boolean
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    handleSubmit: () => void
    handleChange: (e: any) => void
}

export default function Modal({
    title,
    openModal,
    setOpenModal,
    handleSubmit,
    handleChange
}: ModalProps) {

    return (
        <>
            <div
                className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${openModal ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
                onClick={() => setOpenModal(false)}
            >
                {/* Overlay */}
                <div className="fixed inset-0 bg-black/50 z-40"></div>

                {/* Modal */}
                <div
                    className="fixed inset-0 flex items-center justify-center z-50"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-1/2 max-w-lg border border-gray-100">
                        <h3 className="font-bold text-xl text-gray-800 mb-6">{title}</h3>

                        <hr className="border-gray-200 mb-6" />

                        {/* FORMULIR PRODUCT */}
                        <div className="my-3">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                            <input
                                type="number"
                                name="price"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <input
                                type="text"
                                name="description"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                            <input
                                type="text"
                                name="image"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                                onChange={handleChange}
                            />
                        </div>

                        <hr className="border-gray-200 mt-6 mb-4" />

                        <div className="flex justify-end gap-3">
                            <button
                                className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
                                onClick={() => setOpenModal(false)}
                            >
                                Close
                            </button>
                            <button
                                className="px-4 py-2 text-sm rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition"
                                onClick={handleSubmit}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}