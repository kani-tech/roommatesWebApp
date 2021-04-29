import React, { useState } from 'react'
import axios from 'axios'
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom"

function RegistrationScreen() {
    //<Link to="/roomKeyPage"></Link>
    // initial state to set state
    const [email, setEmail] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');


    const handleSubmit = async event => {
        event.preventDefault();
        console.log(`
      firstName: ${firstName}
      lastName: ${lastName}
      Email: ${email}
      Password: ${password}
    `);

        const payload = {
            firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
            lastName: lastName,
            Email: email,
            Password: password
        }

        const response = await axios({
            url: 'http://localhost:4000/api/register',
            method: 'post',
            data: payload
        })

        console.log(response)


        if (response.data.token == 1234) {
            console.log(response.data.token)
            setUser(response.data);
            localStorage.setItem("user", JSON.stringify(payload));
            console.log("redirect")


        } else if (response.data.token == 4321) {
            console.log(response.data.token)
            alert("Oops, that email already exists!");
        }
    }

    if (user) {
        return <Redirect to="/roomKeyPage"></Redirect>
    }

    return (
        <div class="user">
            <header class="user__header">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3219/logo.svg" alt="" />
                <h1 class="user__title">Registration</h1>
            </header>
            <form class="form" onSubmit={handleSubmit}>
                <div class="form__group">
                    <input type="text" name="fName" value={firstName} onChange={e => setfirstName(e.target.value)} placeholder="First Name" class="form__input" />
                </div>

                <div class="form__group">
                    <input type="text" name="lName" value={lastName} onChange={e => setlastName(e.target.value)} placeholder="Last Name" class="form__input" />
                </div>

                <div class="form__group">
                    <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" class="form__input" />
                </div>

                <div class="form__group">
                    <input type="password" name="pass" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" class="form__input" />
                </div>

                <button class="btn" type="submit">Register</button>
            </form>
            <h1>Click <Link to="/login"> here </Link>  to login if you have an account</h1>
        </div>
    )
}

export default RegistrationScreen;