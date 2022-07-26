import React from "react";
import { Link } from "react-router-dom";

import { RegisterMenu, UserMenu } from "../features/users";

import "./AppHeader.css";

export const AppHeader = ({ isAuth }) => {
    return (
        <div className="appHeader__container">
            <div className="appHeader__logo">
                <Link to={"/"}>
                    <h1 className="text_h1">Chat for everyone</h1>
                </Link>
            </div>
            <div>
                { isAuth
                ? <UserMenu />
                : <RegisterMenu /> }
            </div>
        </div>
    )
}