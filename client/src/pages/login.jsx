
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types';

import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


// Pages

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = loggedInUser;
            setUser(foundUser);
        }
    }, []);

    const handleLogout = () => {
        setUser({});
        setEmail("");
        setPassword("");
        localStorage.clear();
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const user = { email: email, password: password };

        const response = await axios({
            url: 'http://localhost:4000/api/login',
            method: 'post',
            data: user
        })

        console.log(response.data)

        if (response.data.token == 1234) {
            setUser(response.data)
            console.log(user)
            localStorage.setItem("user", JSON.stringify(response.data));
        } else {
            toast.error('Invalid username or password')
        }
    }

    if (user) {

        return (
            <div>
                <Route exact path="/login" >
                    <Redirect to="/dashboard" />
                </Route>
                <button onClick={handleLogout}>logout</button>
            </div>

        )
    }

    return (
        <div class="user-login">
            <header class="user__header">
                <h1 class="user__title">Login</h1>
            </header>

            <form class="form" onSubmit={handleSubmit}>

                <div class="form__group">
                    <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" class="form__input" required />
                </div>

                <div class="form__group">
                    <input type="password" name="pass" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" class="form__input" required />
                </div>

                <button class="btn btn-lg btn-secondary" id="log-in-btn"
                    type="submit">Login</button>

            </form>


        </div>

    )

}


export default LoginPage;


