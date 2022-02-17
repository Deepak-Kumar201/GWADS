import React, { useEffect } from "react";
import { useState } from "react";
import "./style.css";
import upload from "../../Firebase/Firebaseinit"

export default function Images() {
    const [uploaded, setuploaded] = useState([]);
    const [selectCount, setselectCount] = useState(0)
    const img = [
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/Default%2F1-min.jpg?alt=media&token=1d80f523-f578-43cb-ac01-9bf4142dd220",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/Default%2F10-min.jpg?alt=media&token=246841c4-0c51-491f-baac-dac029d38072",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/Default%2F11-min.jpg?alt=media&token=0ab48f35-599a-43a3-9794-cc352d41c60b",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/Default%2F12-min.jpg?alt=media&token=94f4baae-717d-4e86-a895-716e62221b27",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/Default%2F13-min.jpg?alt=media&token=9b3212b6-eb91-4187-aaf6-48ef0641d259",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/Default%2F14-min.jpg?alt=media&token=770aea62-7d25-462e-853d-2d9531f0f7aa",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/Default%2F15-min.jpg?alt=media&token=ab98f54d-eea8-4d11-8933-4b35c7f6721c",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/Default%2F16-min.jpg?alt=media&token=6cbf7809-7e7b-4155-aebb-79416d7056ae",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/Default%2F17-min.jpg?alt=media&token=d1e328b1-33e6-4e8e-b925-2c73f636f26b",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/Default%2F18-min.jpg?alt=media&token=59886b44-6ed5-47d6-8d6d-ac213650ce07",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/Default%2F19-min.jpg?alt=media&token=3aac7c84-d195-487f-8c32-7dbbaf98d475",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/Default%2F2-min.jpg?alt=media&token=8a1ca8a8-afb8-4b95-bfa9-429ac87de225",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/Default%2F20-min.jpg?alt=media&token=cd22365e-8b3e-4a02-a131-14b0cb2034b6",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/Default%2F21-min.jpg?alt=media&token=615f74ea-a0bf-490b-a52d-52ca3b34a5c9",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/Default%2F3-min.jpg?alt=media&token=3a9e9368-1c8f-4aeb-acbc-7d16e2bf673b",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/Default%2F4-min.jpg?alt=media&token=a4dc4502-bb2a-4f92-94c0-4a58b765867a",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/Default%2F5-min.jpg?alt=media&token=c790094e-6ff4-42fb-8b36-b8d11b1f4640",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/Default%2F6-min.jpg?alt=media&token=696cb89e-4f45-4b41-bdd1-141c722287e8",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/Default%2F8-min.jpg?alt=media&token=3c9fc734-df80-41a9-a2cf-599da6ae8361",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/Default%2F9-min.jpg?alt=media&token=c3b8c0cc-3119-4f20-97ca-801707c889a6",
    ];

    useEffect(()=>{
        console.log(selectCount);
    }, [selectCount])

    const addimage = async ()=>{
        var fileInput = document.getElementById("uploadimages");
        var label = document.getElementById("uploadLabel");
        if (fileInput.files.length > 0) {
            fileInput.setAttribute("disabled",true);
            label.innerHTML = `
                <div class="spinner-border text-light" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            `;
            if (
                fileInput.files[0].name.endsWith(".jpg") ||
                fileInput.files[0].name.endsWith(".jpeg") ||
                fileInput.files[0].name.endsWith(".png")
            );
            else {
                window.alert(
                    "Cover image foramt should be in jpg, png or jpeg"
                );
                return;
            }

            console.log("Uploading image");
            const img = await upload("image/jpg", "uploadimages");
            console.log(img);
            
            setuploaded([...uploaded, img]);
            label.innerHTML = "Upload";
            fileInput.removeAttribute("disabled")
        }
    }


    const createAccount = ()=>{
        const elem = document.getElementsByClassName("logincheck");
        var checked = [];
        for(var i of elem){
            if(i.checked){
                checked.push(i.getAttribute("url"));
            }
        }
        console.log(checked);
    }

    return (
        <div className="uploadImage">
            <div className="signUpimages">
                {uploaded.length != 0 ? (
                    <div>
                        <div className="heading">Yours Uploads :</div>
                        <div className="uploadCont">
                            {uploaded.map((elem, index) => {
                                return (
                                    <>
                                        <input
                                            type="checkbox"
                                            id={"Ulogin" + index}
                                            style={{ display: "none" }}
                                            url={elem}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    if(selectCount >= 5){
                                                        window.alert("You can select max 5 images");
                                                        e.target.checked = false;
                                                        return;
                                                    }
                                                    document
                                                        .getElementById(
                                                            "Uimage" + index
                                                        )
                                                        .classList.add(
                                                            "bordered"
                                                        );
                                                    setselectCount(selectCount + 1);
                                                } else {
                                                    document
                                                        .getElementById(
                                                            "Uimage" + index
                                                        )
                                                        .classList.remove(
                                                            "bordered"
                                                        );
                                                    setselectCount(selectCount - 1);

                                                }
                                            }}
                                            className="logincheck"
                                        />
                                        <label htmlFor={"Ulogin" + index}>
                                            {" "}
                                            <img
                                                src={elem}
                                                width="150px"
                                                id={"Uimage" + index}
                                                className="selectImage"
                                            />
                                        </label>
                                    </>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <></>
                )}

                <div>
                    <div className="heading">Select From Them :</div>
                    <div className="uploadCont">
                        {img.map((elem, index) => {
                            return (
                                <>
                                    <input
                                        type="checkbox"
                                        id={"alogin" + index}
                                        style={{ display: "none" }}
                                        url={elem}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                if(selectCount >= 5){
                                                    window.alert("You can select max 5 images");
                                                    e.target.checked = false;

                                                    return;
                                                }
                                                document
                                                    .getElementById(
                                                        "aimage" + index
                                                    )
                                                    .classList.add("bordered");
                                                    setselectCount(selectCount + 1);

                                            } else {
                                                document
                                                    .getElementById(
                                                        "aimage" + index
                                                    )
                                                    .classList.remove(
                                                        "bordered"
                                                    );
                                                    setselectCount(selectCount - 1);

                                            }
                                        }}
                                        className="logincheck"
                                    />
                                    <label htmlFor={"alogin" + index}>
                                        {" "}
                                        <img
                                            src={elem}
                                            width="150px"
                                            id={"aimage" + index}
                                            className="selectImage"
                                        />
                                    </label>
                                </>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="uploadSave">
                <input
                    type="file"
                    id="uploadimages"
                    style={{ display: "none" }}
                    onChange={addimage}
                />
                <label className="imgbuttonsLab" htmlFor="uploadimages" id="uploadLabel">
                    Upload
                </label>
                <button className="imgbuttons" onClick={createAccount}>Create</button>
            </div>
        </div>
    );
}
