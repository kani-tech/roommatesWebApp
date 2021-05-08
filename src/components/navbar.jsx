import React, { useState } from 'react'
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar'
import { Form, Button, FormControl, Nav, NavDropdown } from 'react-bootstrap'


const MyNavBar = (props) => (

    <Navbar bg="light" expand="lg" width="20rem">

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="mr-auto">

                <Nav.Link href="/dashboard">Home</Nav.Link>
                <Nav.Link href="/chores">Tasks</Nav.Link>
                <Nav.Link href="/complaints">Requests</Nav.Link>
                <Nav.Link href="/payrent">Finances</Nav.Link>

            </Nav>
            <Form inline>
                <Link to="/">
                    <button onClick={props.logout}>Logout</button>
                </Link>

            </Form>
        </Navbar.Collapse>

    </Navbar>
)


export default MyNavBar



