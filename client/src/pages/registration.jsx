import React, { useState } from 'react'
import axios from 'axios'

function RegistrationScreen() {

    // initial state to set state
    const [email, setEmail] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
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

        axios({
            url: 'http://localhost:4000/api/register',
            method: 'post',
            data: payload
        }).then(() => {
            console.log('Data received')
        }).catch(() => {
            console.log('error')
        })

        event.preventDefault();
    }

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
                />
            </label>
            <button>Submit</button>
        </form>
    )
}

export default RegistrationScreen;
