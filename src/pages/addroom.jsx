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
    const [roomKey, setRoomKey] = useState("");
    const [user, setUser] = useState("");
    const [rent, setRent] = useState(0)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    setTimeout(function () {
        const currUser = JSON.parse(localStorage.getItem('user'));
        if (currUser) {
            setUser(currUser.name);
            setRoomKey(currUser.roomKey);
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

    async function handleToken(token) {
        const payload = {
            token: token,
            product: rent
        }
        const response = await axios({
            url: 'http://localhost:4000/api/checkout',
            method: 'post',
            data: payload
        })


        const { status } = response.data
        if (status === 'success') {
            toast.success('Payment Received!! Check your email for details')
        } else {
            toast.error('Uh oh something went wrong')
        }
    }

    return (
        <div>
            <LandlordNavBar logout={2} />
            <div className="">
                <h1 className=""> Enter your request </h1>
                <form onSubmit={2} className="">
                    <div className="">
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"

                        />
                    </div>
                    <div className="">
                        <textarea
                            placeholder="body"
                            name="body"
                            cols="50"
                            rows="5"
                        >

                        </textarea>
                    </div>

                    <button>Submit</button>
                </form>

            </div>

        </div>

    )
}

export default Addroom;
