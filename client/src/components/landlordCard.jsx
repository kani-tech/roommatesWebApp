import React, { useState } from 'react'
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { Form, Button, FormControl, Nav, NavDropdown } from 'react-bootstrap'
import Example from './rentModal'
import Modal from 'react-bootstrap/Modal'


function LandlordCard(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (

        <Card className="card">
            <Card.Body>
                <Card.Title>Address: {props.address}</Card.Title>
                <Card.Title></Card.Title>

                <Card.Subtitle className="mb-2 text-muted">The rent for this property is {props.rent}</Card.Subtitle><br />

                <Card.Subtitle className="mb-2 text-muted">Here's the update for this month</Card.Subtitle>
                <ListGroup variant="flush">

                    <ListGroup.Item>All rent paid: {props.rentpaid}</ListGroup.Item>
                    <ListGroup.Item>Active complaints: {props.complaints}</ListGroup.Item>
                </ListGroup>
            </Card.Body>
            <>
                <Button variant="primary" onClick={handleShow}>
                    Further information
        </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Roomkey {props.roomkey}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Payments: {props.payments}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
            </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
            </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </Card>

    );



}
/*const LandlordCard = (props) => (

    <Card className="card">
        <Card.Body>
            <Card.Title>Address: {props.address}</Card.Title>
            <Card.Title></Card.Title>

            <Card.Subtitle className="mb-2 text-muted">The rent for this property is {props.rent}</Card.Subtitle><br />

            <Card.Subtitle className="mb-2 text-muted">Here's the update for this month</Card.Subtitle>
            <ListGroup variant="flush">

                <ListGroup.Item>All rent paid: {props.rentpaid}</ListGroup.Item>
                <ListGroup.Item>Active complaints: {props.complaints}</ListGroup.Item>
            </ListGroup>
        </Card.Body>
        <Example>{props}</Example>
    </Card>
)
*/
export default LandlordCard



