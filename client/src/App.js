import React, { useState } from 'react'
import axios from 'axios'

import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom"
// Pages
import registrationScreen from "./pages/registration.jsx"
import homePage from "./pages/home.jsx"
import Errpage from "./pages/errpage.jsx"
import LoginPage from "./pages/login.jsx"


function App() {
  const [token, setToken] = useState('')

  if (!token) {
    return <LoginPage setToken={setToken} />
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={homePage} />
        <Route exact path="/register" component={registrationScreen} />
        <Route exact path="/login" component={LoginPage} />
        <Route component={Errpage} />
        <Redirect to="/404" />
      </Switch>
    </BrowserRouter>
  )


  /*
  const [email, setEmail] = useState('')
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
            type="text"
            name="pass"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <button>Submit</button>
      </form>
  )*/
}

export default App;