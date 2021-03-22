import React from "react";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom"
// Pages

const homePage = () => {

    return (
        <div>
            <h3>Welcome to roomates</h3>
            <Link to="/login">
                <button type="button">
                    Login
     </button>
            </Link>
            <Link to="/register">
                <button type="button">
                    Register
                </button>
            </Link>
        </div>
    )
}

export default homePage;