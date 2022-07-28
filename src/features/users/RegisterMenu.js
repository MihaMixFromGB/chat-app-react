import React from "react";
import { Link } from "react-router-dom";

import "./RegisterMenu.css";

export const RegisterMenu = () => {
    return (
        <div className="registerMenu__container">
            <Link className="text_regular" to={"signin"}>Sign In</Link>
            <Link className="text_regular registerMenu__signUp" to={"signup"}>Sign Up</Link>
        </div>
    )
};