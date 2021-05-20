import React, { useState, useEffect } from "react";
import ToDoItem from "../components/todoitem.jsx";
import axios from 'axios'
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom"
import RentCard from '../components/rentcard.jsx'
import Table from 'react-bootstrap/Table'
import MyNavBar from '../components/navbar.jsx'
import StripeCheckout from 'react-stripe-checkout'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LandlordNavBar from '../components/landlordnavbar.jsx'

toast.configure()
function Addroom() {
    const [roomKey, setRoomKey] = useState(false);
    const [user, setUser] = useState("");
    const [rent, setRent] = useState(0)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');


    setTimeout(function () {
        const currUser = JSON.parse(localStorage.getItem('user'));
        if (currUser) {
            setUser(currUser.name);
            setEmail(currUser.email);
        } else {
            setUser(null)
        }
    }, 1);


    const handleLogout = () => {
        setUser({});
        setEmail("");
        setPassword("");
        localStorage.clear();
    };

    const handleSubmit = async e => {
        e.preventDefault()
        const key = makeid(6)
        console.log('key', key)
        setRoomKey(key)

        const payload = {
            roomkey: key,
            email: email,
            rent: rent,
            address: address
        }

        const response = await axios({
            url: '/api/addroom',
            method: 'post',
            data: payload
        })

        console.log(response.data)

        toast.success(`Your key is ${key}`)

        e.target.reset()


    }


    function makeid(length) {
        var result = [];
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result.push(characters.charAt(Math.floor(Math.random() *
                charactersLength)));
        }
        return result.join('');
    }

    console.log(roomKey)
    return (
        <div>
            <LandlordNavBar logout={handleLogout} />
            <div className="">
                <h1 className=""> Just give us some information to get started </h1>
                <form onSubmit={handleSubmit} className="">
                    <div className="">
                        <input
                            type="text"
                            name="address"
                            placeholder="address"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="">
                        <input
                            type="number"
                            name="Rent Amount"
                            placeholder="Rent Amount"
                            value={rent}
                            onChange={e => setRent(e.target.value)}
                        />
                    </div>

                    <button>Produce Key</button>
                </form>

            </div>

        </div>

    )


}

export default Addroom;
