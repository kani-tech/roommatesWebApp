import React, { useState } from 'react'
import axios from 'axios'

import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom"
// Pages
import registrationScreen from "./pages/registration.jsx"
import homePage from "./pages/home.jsx"
import Errpage from "./pages/errpage.jsx"
import LoginPage from "./pages/login.jsx"
import Dashboard from "./pages/dashboard.jsx"
import EnterRoomKey from "./pages/pageafterregister.jsx"
import ChoresTDL from "./pages/chores.jsx"
import Complaints from "./pages/complaints.jsx"
import PayRent from "./pages/payment.jsx"
import Addroom from "./pages/addroom.jsx"




function App() {
  <head>

  </head>
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={homePage} />
        <Route exact path="/register" component={registrationScreen} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/roomKeyPage" component={EnterRoomKey} />
        <Route exact path="/chores" component={ChoresTDL} />
        <Route exact path="/complaints" component={Complaints} />
        <Route exact path="/payrent" component={PayRent} />
        <Route exact path="/addroom" component={Addroom} />

        <Route component={Errpage} />
        <Redirect to="/404" />
      </Switch>
    </BrowserRouter>
  )
}

export default App;