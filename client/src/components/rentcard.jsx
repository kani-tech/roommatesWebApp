import React, { useState } from 'react'
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { Form, Button, FormControl, Nav, NavDropdown } from 'react-bootstrap'
import Dashboard from '../pages/dashboard'
import '../stylesheets/card.css'

const RentCard = (props) => (

    <Card className="card">
        <Card.Body>
            <Card.Title>Finance Information</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Here's the update for this month</Card.Subtitle>
            <ListGroup variant="flush">
                <ListGroup.Item>You owe: {props.rent}</ListGroup.Item>
                <ListGroup.Item>By: {props.date}</ListGroup.Item>
            </ListGroup>
        </Card.Body>
    </Card>
)

export default RentCard



