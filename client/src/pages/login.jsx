
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types';

import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom"
import dashboard from "/Users/kanishksk/Documents/roomatesV3/client/src/pages/dashboard.jsx"
import Errpage from "/Users/kanishksk/Documents/roomatesV3/client/src/pages/errpage.jsx"
import '../stylesheets/login.css'
import 'bootstrap/dist/css/bootstrap.min.css';


// Pagesß

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState();

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

        if (response.data.token == 1234) {
            setUser(response.data)
            localStorage.setItem("user", JSON.stringify(response.data));
        } else {
            alert("Invalid email or password")
        }

        console.log(response.data.token);

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
    /* 
    if (user) {
        return (
            <div>
                {user.name} is logged in
                <button onClick={handleLogout}>logout</button>
            </div>
        );
    }
 */



    /*if (user) {
        <Route exact path="/login" >
            <Redirect to="/dashboard" />
        </Route>
        //return <div> {user.name} is logged in </div>
    }*/

    return (
        <div className="form-signin">
            <form onSubmit={handleSubmit}>
                <h1>Log in here</h1>
                <div className="form-floating">
                    <label>
                        Email:
                <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="form-control"
                            required
                        />
                    </label>
                </div>

                <div className="form-floating">
                    <label>
                        Password:
                <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="form-control"
                            required
                        />
                    </label>
                </div>

                <button className="w-100 btn btn-lg btn-primary">Submit</button>
            </form>
        </div>
    )




}


export default LoginPage;


