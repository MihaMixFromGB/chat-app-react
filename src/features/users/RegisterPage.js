import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { signIn, signUp } from "./usersSlice";

import "./RegisterPage.css";

export const RegisterPage = ({ isSignUp }) => {    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const dispatch = useDispatch();

    const onEmailChanged = (event) => { setEmail(event.target.value) };
    const onPasswordChanged = (event) => { setPassword(event.target.value) };

    const onClickBtn = () => {
        if (!!isSignUp) {
            dispatch(signUp({ email, password }));
        }
        if (!isSignUp) {
            dispatch(signIn({ email, password }));
        }
    };

    return (
        <div className="registerPage__container">
            <input
                type="email"
                value={email}
                placeholder="email"
                onChange={onEmailChanged} />
            <input
                type="password"
                value={password} 
                placeholder="password"
                onChange={onPasswordChanged} />
            <input
                type="button"
                value={isSignUp ? "Sign Up" : "Sign In"}
                onClick={onClickBtn} />
        </div>
    )
};