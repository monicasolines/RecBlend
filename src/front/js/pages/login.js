import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router";
import "../../styles/home.css";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    // Handle the redirection if token is present
    useEffect(() => {
        if (store.token) {
            history.push("/");
        }
    }, [store.token, history]);

    const handleClick = async () => {
        try {
            await actions.login(email, password);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className="text-center mt-5">
            <h1>Login</h1>
            {store.token ? (
                <div>
                    You are logged in with this token: {store.token}
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleClick}>Login</button>
                </div>
            )}
        </div>
    );
};
