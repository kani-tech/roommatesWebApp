import React, {useState} from 'react';
import axios from 'axios';
import {BrowserRouter, Route, Switch, Link, Redirect} from 'react-router-dom';

function EnterRoomKey() {
  const [roomKey, setRoomKey] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [flipper, setFlipper] = useState(false);

  setTimeout(function () {
    const currUser = JSON.parse(localStorage.getItem('user'));
    if (currUser) {
      setEmail(currUser.Email);
    }
  }, 10);

  console.log(email);

  const payload = {
    roomKey: roomKey,
    email: email,
  };

  const handleLogout = () => {
    setUser({});
    setEmail('');
    localStorage.clear();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios({
      url: '/api/roomKeyPage',
      method: 'post',
      data: payload,
    });

    console.log(response);

    if (response.data.token == 1234) {
      //console.log(response.data.token)
      setRoomKey(response.data.roomKey);
      setFlipper(true);
      handleLogout();
      //console.log("redirect")

      //console.log(flipper);
    } else if (response.data.token == 4321) {
      console.log(response.data.token);
      alert('You not invited to da ROOM');
    }
  };

  if (flipper) {
    console.log(roomKey);
    return <Redirect to="/login"></Redirect>;
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>Enter Your RoomKey</h1>
      <label>
        RoomKey
        <input
          type="text"
          name="roomkey"
          value={roomKey}
          onChange={(e) => setRoomKey(e.target.value)}
          required
        />
      </label>
      <button>Submit</button>
    </form>
  );
}

export default EnterRoomKey;
