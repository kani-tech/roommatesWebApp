import React, { useState } from 'react'
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { Form, Button, FormControl, Nav, NavDropdown } from 'react-bootstrap'
import Example from './rentModal'
import '../stylesheets/card.css'

const LandlordCard = (props) => (

    <Card className="card">
        <Card.Body>
            <Card.Title>Room: {props.roomkey}</Card.Title>

            <Card.Subtitle className="mb-2 text-muted">The rent for this property is {props.rent}</Card.Subtitle>

            <Card.Subtitle className="mb-2 text-muted">Here's the update for this month</Card.Subtitle>
            <ListGroup variant="flush">
                <ListGroup.Item>All rent paid: {props.rentpaid}</ListGroup.Item>
                <ListGroup.Item>Active complaints: {props.complaints}</ListGroup.Item>
            </ListGroup>
        </Card.Body>
        <Example />
    </Card>
)

export default LandlordCard



