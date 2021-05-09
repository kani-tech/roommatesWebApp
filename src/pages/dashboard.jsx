import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom"
import MyNavBar from '../components/navbar.jsx'
import LandlordNavBar from '../components/landlordnavbar.jsx'
import LandlordCard from '../components/landlordCard.jsx'
import Example from '../components/rentModal.jsx'



import Navbar from 'react-bootstrap/Navbar'
import { Form, Button, FormControl, Nav, NavDropdown } from 'react-bootstrap'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import '../stylesheets/table.css'
import '../stylesheets/landlordcard.css'



function Dashboard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    const [roomKey, setRoomKey] = useState('')
    const [roomies, setRoomies] = useState([])
    const [landlord, setlandlord] = useState(false)
    const [rooms, setRooms] = useState([]);

    setTimeout(function () {
        const currUser = JSON.parse(localStorage.getItem('user'));
        if (currUser) {
            setEmail(currUser.email);
            setUser(currUser.name);
            setRoomKey(currUser.roomKey)
            setlandlord(currUser.landlord)
        } else {
            setUser(null)
        }
    }, 1);

    useEffect(() => {
        if (!roomKey) {
            return;
        }

        const payload = {
            roomKey: roomKey
        }
        async function getInfo() {
            const response = await axios({
                url: 'http://localhost:4000/api/dashboard',
                method: 'post',
                data: payload
            })

            console.log(response.data.roommates)
            setRoomies(response.data.roommates)

        }
        getInfo();
    }, [roomKey]);

    const renderUser = (mates, index) => {
        return (
            <tr key={index}>
                <td>{mates.firstName}</td>
                <td>{mates.lastName}</td>
                <td>{mates.email}</td>
            </tr>
        )
    }



    const handleLogout = () => {
        setUser({});
        setEmail("");
        setPassword("");
        localStorage.clear();
    };

    useEffect(() => {
        if (!landlord) {
            return;
        }

        const getRooms = async () => {
            const payload = {
                email: email
            }

            const response = await axios({
                url: 'http://localhost:4000/api/getRooms',
                method: 'post',
                data: payload
            })

            console.log(response.data)
            setRooms(response.data.tenants.rooms)
        }

        getRooms()

    }, [landlord])




    const renderCards = (rooms, index) => {
        return (
            <div className='landlordcard'>
                <LandlordCard
                    key={index}
                    id={index}
                    address={rooms.address}
                    roomkey={rooms.key}
                    rent={rooms.rent}
                />

            </div>
        )

    }

    if (user === null) {
        return (
            <Redirect to="/" />
        )
    } else if (landlord == true) {

        if (!rooms.length) {
            return (
                <div>
                    <LandlordNavBar logout={handleLogout} />
                    <h1>No properties yet head over to add room to get started</h1>
                </div>
            )

        } else {
            return (
                <div>
                    <LandlordNavBar logout={handleLogout} />
                    <h1>Your properties</h1>
                    <div>
                        {rooms.map(renderCards)}
                    </div>
                </div>
            )
        }





    } else {
        return (
            <div>
                <MyNavBar logout={handleLogout} first={'Tasks'} />
                <h1 className='heading'> Welcome to Roommates {user} with Room Key: {roomKey}</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Last Name</th>
                            <th>Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roomies.map(renderUser)}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Dashboard;