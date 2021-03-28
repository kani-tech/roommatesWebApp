import React, { useState } from 'react'
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom"

function Dashboard() {
    let currUser = 'hello'
    setTimeout(function () {
        currUser = JSON.parse(localStorage.getItem('user'));
        //console.log(currUser)
    }, 10);
    //reloadPage();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState();


    console.log(currUser)


    //console.log(currUser.email)
    //let newEmail = obj.email
    const handleLogout = () => {
        setUser({});
        setEmail("");
        setPassword("");
        localStorage.clear();
    };
    return (
        <div>
            <h1> Welcome to da HUB </h1>
            <Link to="/">
                <button onClick={handleLogout}>logout</button>
            </Link>
        </div>

    )
}

export default Dashboard