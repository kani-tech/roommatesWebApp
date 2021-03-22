import React, { useState } from 'react'
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom"
function Dashboard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState();

    const handleLogout = () => {
        setUser({});
        setEmail("");
        setPassword("");
        localStorage.clear();
    };
    return (
        <div>
            <h1> Welcome to da HUB {user} </h1>
            <Link to="/">
                <button onClick={handleLogout}>logout</button>
            </Link>
        </div>

    )
}

export default Dashboard