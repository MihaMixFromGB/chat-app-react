import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames";

import "./Layout.css";

export const Layout = ({ appHeader }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (pathname === "/") {
            navigate("/chats");
        }
    }, [pathname, navigate]);

    return (
        <div className={classNames("appLayout", "container")}>
            <header className="appHeader">
                {appHeader}
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}