import React from "react";
import { useState } from "react";
import "./style.css";
import img1 from "../Image/1-min.jpg"
import img2 from "../Image/2-min.jpg"
import img3 from "../Image/3-min.jpg"
import img4 from "../Image/4-min.jpg"
import img5 from "../Image/5-min.jpg"
import img6 from "../Image/6-min.jpg"
import img7 from "../Image/8-min.jpg"

export default function Homepage() {
    const [images, setImages] = useState([img1,img2,img3,img4,img5,img6,img7]);
    const nextLogin = async (e)=>{
        console.log("object");
        e.preventDefault();
        const username = document.getElementById("username");
        if(username.value.trim().length == 0){
            window.alert("Enter A valid username");
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
            window.alert("Enter A valid Username");
            return;
        }else{
            document.querySelector(".formLogin").style.left = "-100vw";
            document.querySelector(".loginimageSelector").style.left = "0px";
            // setImages(data.ImageData);
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
            window.alert("Selected Images are not correct");
        }else{
            window.alert("Login Successful");
        }

        window.localStorage.removeItem("loginUser");
        window.localStorage.removeItem("loginURL");

    }

    return (
        <div className="container">
            <div className="formLogin">
                <form className="loginform">
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                    />
                    <input type="submit" value="Next" id="login" onClick={nextLogin}/>
                    <a href="#" className="createNew">
                        Create New Account
                    </a>
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
