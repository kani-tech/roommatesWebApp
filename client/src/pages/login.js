
import React, { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types';


import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom"
// Pagesß

const LoginPage = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const user = { email, password };
        const response = await axios.post(
            'http://localhost:4000/api/login',
            user
        )
        setUser(response.data);
        localStorage.setItem('user', response.data)
        console.log(response.data)
    }



    if (user) {
        return <div> {user.name} is logged in </div>
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Log in here</h1>
                <label>
                    Email:
                <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password:
                <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button>Submit</button>
            </form>
        </div>
    )
    //let token = '100'
    /*const handleSubmit = async (event) => {
        console.log(`
        email: ${email}
        password: ${password}
        `)

        const payload = {
            Email: email,
            Password: password
        }

        async function fetchToken() {
            await axios({
                url: 'http://localhost:4000/api/login',
                method: 'post',
                data: payload
            })

        }

        console.log(fetchToken())


        event.preventDefault();
    }*/




}

LoginPage.propTypes = {
    setToken: PropTypes.func.isRequired
};

export default LoginPage;


