import React, { useState } from 'react'
import axios from 'axios'

import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom"
// Pages
import registrationScreen from "./pages/registration.jsx"
import homePage from "./pages/home.jsx"
import Errpage from "./pages/errpage.jsx"
import LoginPage from "./pages/login.js"
import Dashboard from "./pages/dashboard.jsx"


function App() {
  const [token, setToken] = useState('')

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={homePage} />
        <Route exact path="/register" component={registrationScreen} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route component={Errpage} />
        <Redirect to="/404" />
      </Switch>
    </BrowserRouter>
  )
}

export default App;