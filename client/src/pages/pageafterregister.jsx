import React, { useState } from 'react'
import axios from 'axios'


function EnterRoomKey() {
    const [roomKey, setRoomKey] = useState('')
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