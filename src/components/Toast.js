import React from "react";
import "../assets/Toast.css";

const Toast = ({ message, open, status }) => {

    let colorClass = "";

    if (status === "error") {
        colorClass = "error";
    } else if (status === "success") {
        colorClass = "success";
    } else if (status === "warning") {
        colorClass = "warning";
    }

    return(
        <>
       {open && 
       <div className={"containerToast " + colorClass}>
            <div>
                <p>{message}</p>
            </div>
        </div>}
        </>
    )
}

export default Toast;