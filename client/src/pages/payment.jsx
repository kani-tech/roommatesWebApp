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
import '../stylesheets/card.css'





toast.configure()
function PayRent() {
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
            setRent(600);
            setEmail(currUser.email)
        } else {
            setUser(null)
        }
    }, 1);

    const schedule = require('node-schedule');

    const job = schedule.scheduleJob('0 0 0 1 * *', async function () {

        async function resetRent() {
            let roomies = 1
            const response = await axios({
                url: 'http://localhost:4000/api/rent',
                method: 'post',
                data: { email: email }
            })
        }
        resetRent();
    });


    const handleLogout = () => {
        setUser({});
        setEmail("");
        setPassword("");
        localStorage.clear();
    };

    async function handleToken(token) {
        const payload = {
            token: token,
            product: rent,
            user: user,
            email: email
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
            <MyNavBar logout={handleLogout} />
            <RentCard
                rent={600}
                date={'April 30th, 2021'} />
            <div className='button-checkout'>
                <StripeCheckout
                    stripeKey="pk_test_51IlJLyHixsK8VUAY3QUDK5bIxd742as0tLWZmmNh8493DuOyxoEFrAk5aFhWYanPz8SUlbKYcg95Wh7DkfydSzPV008XPcmnCe"
                    token={handleToken}
                    billingAddress
                    shippingAddress
                    amount={rent * 100}
                    name={'rent'}
                    fluid
                />

            </div>


        </div>

    )

}

export default PayRent;
