import React, { useEffect } from "react";
import { useState } from "react";
import "./style.css";
import upload from "../../Firebase/Firebaseinit";

export default function Images({ setShowImage, showImage, history }) {
    const [uploaded, setuploaded] = useState([]);
    const [selectCount, setselectCount] = useState(0);
    const img = [
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/1-min.jpg?alt=media&token=ace94505-8c29-404c-8553-ce34832be7ae",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/2-min.jpg?alt=media&token=9d42390d-25a6-4885-91d4-4ab9cc538d35",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/3-min.jpg?alt=media&token=651d0235-526d-467c-b69f-6a646980864a",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/4-min.jpg?alt=media&token=24431009-901c-43e6-bb7c-2c41c482d74a",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/5-min.jpg?alt=media&token=9f80a066-141a-4e87-b0f2-f737fd2e94e5",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/6-min.jpg?alt=media&token=48e70fa6-66d8-4ca1-a95a-59f5d46844e6",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/8-min.jpg?alt=media&token=1dfce4b1-07e0-4301-b551-09c0331dabb0",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/9-min.jpg?alt=media&token=75d44b74-bd6d-4242-b967-4dc2464334a8",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/10-min.jpg?alt=media&token=05a2f242-77dd-460c-a116-82d75edef3ed",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/11-min.jpg?alt=media&token=7f57104d-9a10-4298-a591-71bf8e3f2d33",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/12-min.jpg?alt=media&token=cb5285c3-875b-477e-a5f2-ed8025a9c653",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/13-min.jpg?alt=media&token=f55e657e-89cf-4ad2-9cea-bb5a96f63bb9",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/14-min.jpg?alt=media&token=0c6a2c1f-a3a8-4c76-8199-1e19033f438a",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/15-min.jpg?alt=media&token=4a8d2e94-3781-4b7b-b99a-de426950c9c7",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/16-min.jpg?alt=media&token=7118b50c-06ac-451d-aedc-4ed282620d1c",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/17-min.jpg?alt=media&token=0207c92c-0402-43d3-b86d-804d8b2e7939",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/18-min.jpg?alt=media&token=3d9b4099-e532-484e-8297-e350430a8932",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/19-min.jpg?alt=media&token=1acaf770-aa7a-4242-840b-f0adf44fccf3",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/20-min.jpg?alt=media&token=3b249cd3-2108-4941-ad42-ea39ba7528f8",
        "https://firebasestorage.googleapis.com/v0/b/gwads-76b81.appspot.com/o/21-min.jpg?alt=media&token=2405549b-1b9a-411b-9f36-56f3b40c2a71",
    ];

    

    useEffect(() => {
        console.log(selectCount);
    }, [selectCount]);

    const addimage = async () => {
        var fileInput = document.getElementById("uploadimages");
        var label = document.getElementById("uploadLabel");
        if (fileInput.files.length > 0) {
            if (fileInput.files.length > 5) {
                window.alert("Cannot Upload more then 5 Items");
                return;
            }
            for (var i = 0; i < fileInput.files.length; i++) {
                if (
                    fileInput.files[i].name.endsWith(".jpg") ||
                    fileInput.files[i].name.endsWith(".jpeg") ||
                    fileInput.files[i].name.endsWith(".png")
                );
                else {
                    window.alert(
                        "Cover image foramt should be in jpg, png or jpeg"
                    );
                    return;
                }
            }

            fileInput.setAttribute("disabled", true);
            label.innerHTML = `
                <div class="spinner-border text-light" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            `;

            console.log("Uploading image");
            const img = await upload("image/jpg", "uploadimages");
            console.log(img);

            const bodydata = {
                URL: img,
            };

            var data = await fetch("http://localhost:5000/api/image/upload", {
                method: "POST",
                body: JSON.stringify(bodydata),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            data = await data.json();
            if (data.error) {
                window.alert(data.error);
                label.innerHTML = "Upload";
                fileInput.removeAttribute("disabled");
                return;
            }

            setuploaded([...uploaded, img]);
            label.innerHTML = "Upload";
            fileInput.removeAttribute("disabled");
        }
    };

    const createAccount = async () => {
        if (selectCount < 5) {
            window.alert("Select 5 images");
            return;
        }

        const elem = document.getElementsByClassName("logincheck");
        var checked = [];
        for (var i of elem) {
            if (i.checked) {
                checked.push(i.getAttribute("url"));
            }
        }

        const bodydata = {
            username: document.getElementById("signupuname").value.trim(),
            name: document.getElementById("signupname").value.trim(),
            imagesURL: checked,
        };
        console.log(bodydata);
        var data = await fetch("http://localhost:5000/api/user/createuser", {
            method: "POST",
            body: JSON.stringify(bodydata),
            headers: {
                "Content-Type": "application/json",
            },
        });
        data = await data.json();
        if (data.error) {
            window.alert(data.error);
            return;
        } else {
            localStorage.setItem("jwttokken", data.jwttokken);
            // window.alert("SignUp Successfull");
            history.push("/");

        }
    };
    if (!showImage) return <></>;

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
                                                    if (selectCount >= 5) {
                                                        window.alert(
                                                            "You can select max 5 images"
                                                        );
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
                                                    setselectCount(
                                                        selectCount + 1
                                                    );
                                                } else {
                                                    document
                                                        .getElementById(
                                                            "Uimage" + index
                                                        )
                                                        .classList.remove(
                                                            "bordered"
                                                        );
                                                    setselectCount(
                                                        selectCount - 1
                                                    );
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
                                                if (selectCount >= 5) {
                                                    window.alert(
                                                        "You can select max 5 images"
                                                    );
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
                <button className="imgbuttons" onClick={()=>{setShowImage(false)}}>
                    Close
                </button>
                <div style={{display:"flex"}}>
                    <input
                        type="file"
                        id="uploadimages"
                        style={{ display: "none" }}
                        onChange={addimage}
                        multiple={true}
                    />
                    <label
                        className="imgbuttonsLab"
                        htmlFor="uploadimages"
                        id="uploadLabel"
                    >
                        Upload
                    </label>
                    <button className="imgbuttons" onClick={createAccount}>
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}
