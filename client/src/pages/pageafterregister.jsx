import React, { useState } from 'react'
import axios from 'axios'


function EnterRoomKey() {
    const [roomKey, setRoomKey] = useState('')
    const [email, setEmail] = useState('')
    const [user, setUser] = useState('');

    setTimeout(function () {
        const currUser = JSON.parse(localStorage.getItem('user'));
        setEmail(currUser.Email);
    }, 10);

    console.log(email);


    const handleSubmit = async event => {

        const response = await axios({
            url: 'http://localhost:4000/api/roomKeyPage',
            method: 'post',
            data: { roomKey: roomKey }
        }).then(() => {
            console.log('Data received')
        }).catch(() => {
            console.log('error')
        })

        event.preventDefault();
    }

    return (
        <form onSubmit={2}>
            <h1>Enter Your RoomKey</h1>
            <label>
                RoomKey
        <input
                    type="text"
                    name="roomkey"
                    value={roomKey}
                    onChange={e => setRoomKey(e.target.value)}
                    required
                />
            </label>
            <button>Submit</button>
        </form>
    )
}

export default EnterRoomKey