import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function Homepage({history,setAlert,alertBody}) {
    const [images, setImages] = useState([]);
    const nextLogin = async (e)=>{
        console.log("object");
        e.preventDefault();
        const username = document.getElementById("username");
        if(username.value.trim().length == 0){
            alertBody("Enter A valid username");
            setAlert(true);
            return;
        }
        var data = await fetch("http://localhost:5000/api/image/generateRandom",{
            method:'POST',
            body:JSON.stringify({username : username.value}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        data = await data.json();

        if(data.error){
            alertBody("Enter A valid Username");
            setAlert(true)
            return;
        }else{
            document.querySelector(".formLogin").style.left = "-100vw";
            document.querySelector(".loginimageSelector").style.left = "0px";
            setImages(data.ImageData);
        }
    }

    
    const previousstep = ()=>{
        document.querySelector(".formLogin").style.left = "0vw";
        document.querySelector(".loginimageSelector").style.left = "100vw";

    }

    const loginMe = async ()=>{
        const elem = document.getElementsByClassName("logincheck");
        const username = document.getElementById("username");
        var checked = [];
        for(var i of elem){
            if(i.checked){
                checked.push(i.getAttribute("url"));
            }
        }
        console.log(checked);
        if(checked.length != 5){
            alertBody("Please Select 5 images");
            setAlert(true);
            return;
        }
        window.localStorage.setItem("loginUser",username.value);
        window.localStorage.setItem("loginURL", checked);
        const bodydata = {
            "username":username.value,
            "imagesURL":checked
        }

        var data = await fetch("http://localhost:5000/api/user/login",{
            method:'POST',
            body:JSON.stringify(bodydata),
            headers:{
                'Content-Type':'application/json'
            }
        })
        data = await data.json();
        console.log(data);
        if(data.error){
            alertBody("Selected Images are not correct");
            setAlert(true);
        }else{
            localStorage.setItem("jwttokken", data.jwttokken);
            // window.alert("Login Successful");
            history.push("/");
        }

        window.localStorage.removeItem("loginUser");
        window.localStorage.removeItem("loginURL");
        window.location.reload();
    }

    return (
        <div className="signuppage">
            <div className="formLogin">
                <form className="loginform">
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                    />
                    <input type="submit" value="Next" id="login" onClick={nextLogin}/>
                    <Link to="signup" className="createNew">
                        Create New Account
                    </Link>
                </form>
            </div>
            <div className="loginimageSelector">
                <div className="imageCont">
                    {
                        images.map((elem, index)=>{
                            return(
                            <>
                                <input type="checkbox" id={"login"+index} style={{display:"none"}} url={elem} onChange={(e)=>{
                                    if(e.target.checked){
                                        document.getElementById("image"+index).classList.add("bordered")
                                    }else{
                                        document.getElementById("image"+index).classList.remove("bordered");
                                    }
                                }} className="logincheck"/>
                                <label htmlFor={"login" + index}> <img src={elem} width="150px" id={"image"+index} className="selectImage"/></label>
                            </>
                            )
                        })
                    }
                </div>
                <div className="buttons">
                    <button id="loginBack" onClick={previousstep}>Back</button>
                    <button id="loginMe" onClick={loginMe}>Login</button>
                </div>
            </div>
        </div>
    );
}
