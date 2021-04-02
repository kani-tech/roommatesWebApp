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
            firstName: firstName,
            lastName: lastName,
            Email: email,
            Password: password
        }

        const response = await axios({
            url: 'http://localhost:4000/api/register',
            method: 'post',
            data: payload
        })
        //}).then(() => {
        //     console.log('Data received')
        // }).catch(() => {
        //     console.log('error')
        // })

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

        <div>
            <form onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                <label>
                    First Name:
        <input
                        type="text"
                        name="fName"
                        value={firstName}
                        onChange={e => setfirstName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Last Name:
        <input
                        type="text"
                        name="lName"
                        value={lastName}
                        onChange={e => setlastName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Email:
        <input
                        type="email"
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
                        name="pass"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    //required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}"
                    />
                </label>

                <button type="submit">
                    Submit
                </button>
            </form>
            <h1>Click <Link to="/login"> here </Link>  to login if you have an account</h1>
        </div>



    )
}/*
    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <label>
                First Name:
<input
                    type="text"
                    name="fName"
                    value={firstName}
                    onChange={e => setfirstName(e.target.value)}
                    required
                />
            </label>
            <label>
                Last Name:
<input
                    type="text"
                    name="lName"
                    value={lastName}
                    onChange={e => setlastName(e.target.value)}
                    required
                />
            </label>
            <label>
                Email:
<input
                    type="email"
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
                    name="pass"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                //required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}"
                />
            </label>
            <button type="button">
                Submit
    </button>
        </form>
    )
}*/

export default RegistrationScreen;