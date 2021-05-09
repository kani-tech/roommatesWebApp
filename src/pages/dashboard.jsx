import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom"
import MyNavBar from '../components/navbar.jsx'
import LandlordNavBar from '../components/landlordnavbar.jsx'
import LandlordCard from '../components/landlordCard.jsx'


import Navbar from 'react-bootstrap/Navbar'
import { Form, Button, FormControl, Nav, NavDropdown } from 'react-bootstrap'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import '../stylesheets/table.css'


function Dashboard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    const [roomKey, setRoomKey] = useState('')
    const [roomies, setRoomies] = useState([])
    const [landlord, setlandlord] = useState(false)

    setTimeout(function () {
        const currUser = JSON.parse(localStorage.getItem('user'));
        console.log('currUser', currUser)
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




    // console.log(roomies)


    const handleLogout = () => {
        setUser({});
        setEmail("");
        setPassword("");
        localStorage.clear();
    };




    if (user === null) {
        return (
            <Redirect to="/" />
        )
    } else if (landlord == true) {
        return (
            <div>
                <LandlordNavBar logout={handleLogout} />
                <h1>Your properties</h1>
                <LandlordCard />
            </div>
        )
    }


    else {
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