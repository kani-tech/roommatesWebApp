import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom"
import MyNavBar from '../components/navbar.jsx'
import Navbar from 'react-bootstrap/Navbar'
import { Form, Button, FormControl, Nav, NavDropdown } from 'react-bootstrap'
import axios from 'axios'

function Dashboard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    const [roomKey, setRoomKey] = useState('')
    const [roomies, setRoomies] = useState([])

    setTimeout(function () {
        const currUser = JSON.parse(localStorage.getItem('user'));
        if (currUser) {
            setEmail(currUser.email);
            setUser(currUser.name);
            setRoomKey(currUser.roomKey)
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

            // console.log(response.data.roommates)
            setRoomies(response.data.roommates)

        }
        getInfo();
    }, [roomKey]);

    useEffect(() => {
        for (let i = 0; i < roomies.length; i++) {
            console.log(roomies[i])
        }
    }, [roomies])

    useEffect(() => {
        return "dun"
    }, [roomies])
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
    } else {
        return (
            <div>
                <MyNavBar />
                <h1> Welcome to da HUB {user} with Room Key: {roomKey}</h1>
                <Link to="/">
                    <button onClick={handleLogout}>logout</button>
                </Link>
            </div>
        )
    }

}

export default Dashboard;