import "./App.css";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";

import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import Alert from "./Components/Alert/Alert";

function App() {
    const history = useHistory();
    const [user, setUser] = useState({});
    const [alertBody, setalertBody] = useState("");
    const [alert, setAlert] = useState(false);
    useEffect(() => {
        const getUser = async () => {
            console.log("first", localStorage.getItem("jwttokken"));
            if (localStorage.getItem("jwttokken") == null) {
                console.log("first");
                history.push("/login");
                return;
            } else {
                const bodydata = {
                    token: window.localStorage.getItem("jwttokken"),
                };
                var data = await fetch("http://localhost:5000/api/user/auth", {
                    method: "POST",
                    body: JSON.stringify(bodydata),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                data = await data.json();
                setUser(data.user);
            }
        };
        getUser();
    }, []);
    return (
        <Switch>
            <Route exact path="/login">
                <Alert
                    setAlert={setAlert}
                    alert={alert}
                    alertBody={alertBody}
                />
                <Login
                    history={history}
                    setAlert={setAlert}
                    alertBody={setalertBody}
                />
            </Route>
            <Route path="/signup">
                <Alert
                    setAlert={setAlert}
                    alert={alert}
                    alertBody={alertBody}
                />

                <SignUp
                    history={history}
                    setAlert={setAlert}
                    alertBody={setalertBody}
                />
            </Route>
            <Route path="/">
                <Alert
                    setAlert={setAlert}
                    alert={alert}
                    alertBody={alertBody}
                />
                <Homepage name={user.name} />
            </Route>
        </Switch>
    );
}

export default App;
