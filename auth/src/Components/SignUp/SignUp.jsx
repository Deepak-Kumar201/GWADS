import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Images from "./Images";
import "./style.css";

export default function SignUp({history}) {
    const [showImage, setShowImage] = useState(false);
    const goahead = async (e)=>{
        e.preventDefault();
        var name = document.getElementById("signupname");
        var nameval = name.value.trim();
        if(nameval.length < 3){
            window.alert("Enter Correct Name");
            return;
        }

        var elem = document.getElementById("signupuname");
        var val = elem.value.trim();
        if(val.length < 3){
            window.alert("Username must be greater then 3");
            return;
        }
        const bodydata = {
            username:val
        }
        var data = await fetch("http://localhost:5000/api/user/exists",{
            method:'POST',
            body:JSON.stringify(bodydata),
            headers:{
                'Content-Type':'application/json'
            }
        })
        data = await data.json();
        if(data.error){
            window.alert("Username not avilable");
            return;
        }else{
            setShowImage(true);
        }
        console.log(data);
    }
    return (
        <div className="signuppage">
            <Images showImage={showImage} setShowImage={setShowImage} history={history}/>
            <form className="signupform">
                <input
                    type="text"
                    id="signupname"
                    className="signupinput"
                    placeholder="Your Name"
                    required={true}
                />
                <input
                    type="text"
                    id="signupuname"
                    className="signupinput"
                    placeholder="Username"
                    required={true}
                />
                <button className="nextsignup" onClick={goahead}>
                    Next
                </button>
                <Link to="/login" className="createNew">Already Have A Account!</Link>
            </form>
        </div>
    );
}
