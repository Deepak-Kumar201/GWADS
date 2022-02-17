import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDT2qU4YbO3IbofjKKUDDNm1O-aQTO7AhI",
    authDomain: "gwads-76b81.firebaseapp.com",
    projectId: "gwads-76b81",
    storageBucket: "gwads-76b81.appspot.com",
    messagingSenderId: "433161918908",
    appId: "1:433161918908:web:0a0836d7f608dde73873b9",
    measurementId: "G-RZ0SW8C9TG"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


const upload = async (type, e) => {
    e = document.getElementById(e);
    const file = e.files[0];
    var fileRef = ref(storage, file.name);
    const metadata = {
        contentType: type,
    };

    await uploadBytesResumable(fileRef, file, metadata);

    const url = await getDownloadURL(fileRef);
    return url;
};

export default upload