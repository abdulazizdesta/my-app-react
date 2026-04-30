interface ModalProps {
    title: string
    description: string
    openModal: boolean
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    handleSubmit: () => void
    // handleChange: (e: any) => void
}

export default function ModalConfirmation({
    title,
    description,
    openModal,
    setOpenModal,
    handleSubmit,
    // handleChange
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

                        <h3 className="font-bold text-xl text-gray-800 mb-2">{title}</h3>
                        <p className="text-sm text-gray-500 py-2">{description}</p>

                        <hr className="border-gray-200 my-6" />

                        <div className="flex justify-end gap-3">
                            <button
                                className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 cursor-pointer transition"
                                onClick={() => setOpenModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 text-sm rounded-lg bg-red-500 hover:bg-red-600 cursor-pointer text-white font-semibold transition"
                                onClick={handleSubmit}
                            >
                                Delete
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}