import React, { useState } from 'react'
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom"
import MyNavBar from '../components/navbar.jsx'
import Navbar from 'react-bootstrap/Navbar'
import { Form, Button, FormControl, Nav, NavDropdown } from 'react-bootstrap'

function Dashboard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState();

    setTimeout(function () {
        const currUser = JSON.parse(localStorage.getItem('user'));
        if (currUser != null) {
            setEmail(currUser.email);
            setUser(currUser.name);
        } else {
            setUser(null)
        }
        //console.log(currUser)
    }, 10);

    console.log(user)

    //console.log(currUser.email)
    //let newEmail = obj.email
    const handleLogout = () => {
        setUser({});
        setEmail("");
        setPassword("");
        localStorage.clear();
    };
    if (user === null) {
        return (
            <Redirect to="/" />
        )

    } else {
        return (
            <div>
                <MyNavBar />
                <h1> Welcome to da HUB {user} </h1>
                <Link to="/">
                    <button onClick={handleLogout}>logout</button>
                </Link>
            </div>
        )
    }

}

export default Dashboard