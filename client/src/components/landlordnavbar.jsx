import React, { useState } from 'react'
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar'
import { Form, Button, FormControl, Nav, NavDropdown } from 'react-bootstrap'
import '../stylesheets/navbar.css'


const LandlordNavBar = (props) => (
    <div className="navbar" fluid>
        <Navbar bg="light" expand="lg" >

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">

                <Nav className="mr-auto nav-text">
                    <Nav.Link href="/dashboard">Home</Nav.Link>
                    <Nav.Link href="/addroom">Add Room</Nav.Link>
                    <Nav.Link href="/payrent">Complaints</Nav.Link>
                </Nav>



                <Link to="/">
                    <button onClick={props.logout} className="logout">Logout</button>
                </Link>



            </Navbar.Collapse>

        </Navbar>

    </div>

)


export default LandlordNavBar



