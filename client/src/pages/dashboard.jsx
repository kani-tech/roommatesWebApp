import React, { useState } from 'react'
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
    const [roomies, setRoomies] = useState('')

    setTimeout(function () {
        const currUser = JSON.parse(localStorage.getItem('user'));
        if (currUser) {
            setEmail(currUser.email);
            setUser(currUser.name);
            setRoomKey(currUser.roomKey)
        } else {
            setUser(null)
        }

        //setRoomies(response.data.roomates)
        //console.log(currUser)
    }, 10);
    //console.log(user)

    //.then(res => console.log(res.data.roommates[0]))
    //console.log(response.data.roommates[0])
    //setRoomies(response.data.roommates);


    const payload = {
        roomKey: roomKey
    }
    setTimeout(async function () {
        const response = await axios({
            url: 'http://localhost:4000/api/dashboard',
            method: 'post',
            data: payload
        })

        console.log(response)
    }, 50)

    //console.log(response);
    //console.log(response)
    /*async function woop() {
        const response = await axios({
            url: 'http://localhost:4000/api/dashboard',
            method: 'post',
            data: payload
        })
    
        setRoomies(response.data.roommates);
    }
    woop()*/
    console.log(roomies);
    //console.log(woop())
    //console.log(mates)
    //console.log(currUser.email)
    //let newEmail = obj.email
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