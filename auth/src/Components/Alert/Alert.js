import React, { useContext } from "react";
import "./style.css";

export default function Alert({setAlert, alertBody, alert}) {
    console.log("first",setAlert, alertBody, alert)
    const hideForm = () => {
        setAlert(false);
    }

    if (alert === false) return <></>;
    return (
        <>
            <div className="cover" onClick={hideForm}>
                <div className="alertBox">
                    <div className="alertBody">{alertBody}</div>
                    <div className="alertOk" onClick={hideForm}>Ok</div>
                </div>
            </div>
        </>
    );
    
}