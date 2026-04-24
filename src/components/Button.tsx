// import React from 'react'
// import styles from "./Button.module.css"

// const buttonStyle: React.CSSProperties = {
//     backgroundColor: "indigo",
//     color: "white",
// }

interface ButtonProps {
    label: string
    color: "primary" | "success" | "warning" | "danger"
    onClick: (label: string) => void
}

export default function Button({label, color, onClick}: ButtonProps) {

    const base = "px-4 py-2 rounded-lg cursor-pointer"
    const colors = {
        primary: "bg-indigo-400 text-white hover:bg-indigo-500",
        success: "bg-green-400 text-white hover:bg-green-500",
        warning: "bg-yellow-400 text-white hover:bg-yellow-500",
        danger: "bg-red-400 text-white hover:bg-red-500"
    }
    return (
        <>
            <button 
            onClick={() => onClick(label)}
            className={base + " " + colors[color]}>{label}</button>
            {/* <div>
                <button style={buttonStyle}>First Button</button>
                <button style={{
                    backgroundColor: "grey",
                    color: "black"
                }}>
                    Button 1
                </button>
                <button className={styles.btn + " " + styles["btn-primary"]}>
                    Button 3
                </button>
                <button className="bg-indigo-400 text-white px-4 py-4 rounded-lg">Button 4</button>
            </div> */}
        </>
    )
}
