import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Switch, Link, Redirect} from 'react-router-dom';
import MyNavBar from '../components/navbar.jsx';
import LandlordNavBar from '../components/landlordnavbar.jsx';
import LandlordCard from '../components/landlordCard.jsx';
import Example from '../components/rentModal.jsx';

import Navbar from 'react-bootstrap/Navbar';
import {Form, Button, FormControl, Nav, NavDropdown} from 'react-bootstrap';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import '../stylesheets/table.css';
import '../stylesheets/landlordcard.css';
import {RootRef} from '@material-ui/core';

function Dashboard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [roomKey, setRoomKey] = useState('');
  const [roomies, setRoomies] = useState([]);
  const [landlord, setlandlord] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [tenants, setTenants] = useState([]);

  setTimeout(function () {
    const currUser = JSON.parse(localStorage.getItem('user'));
    if (currUser) {
      setEmail(currUser.email);
      setUser(currUser.name);
      setRoomKey(currUser.roomKey);
      setlandlord(currUser.landlord);
    } else {
      setUser(null);
    }
  }, 1);

  useEffect(() => {
    if (!roomKey) {
      return;
    }

    const payload = {
      roomKey: roomKey,
    };
    async function getInfo() {
      const response = await axios({
        url: '/api/dashboard',
        method: 'post',
        data: payload,
      });

      console.log(response.data.roommates);
      setRoomies(response.data.roommates);
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
    );
  };

  const handleLogout = () => {
    setUser({});
    setEmail('');
    setPassword('');
    localStorage.clear();
  };

  useEffect(async () => {
    if (!landlord) {
      return;
    }

    const getRooms = async () => {
      const payload = {
        email: email,
      };

      const response = await axios({
        url: '/api/getRooms',
        method: 'post',
        data: payload,
      });

      console.log(response.data);
      setRooms(response.data.allrooms);
    };

    await getRooms();
  }, [landlord]);

  const getTenants = async () => {
    let avoiders = [];
    for (let i = 0; i < rooms.length; i++) {
      for (let n = 0; n < rooms[i][2].length; n++) {
        //console.log(rooms[i][2][n])
        if (rooms[i][2][n].includes(false)) {
          avoiders.push([rooms[i][2][n]]);
        }
      }
    }
    return avoiders;
  };

  console.log('tenants', tenants);
  const renderCards = (rooms, index) => {
    const avoiders = getTenants();
    console.log('avoiders', avoiders);

    if (rooms[1]) {
      return (
        <div className="landlordcard">
          <LandlordCard
            key={index}
            id={index}
            address={rooms[0].address}
            roomkey={rooms[0].key}
            rent={rooms[0].rent}
            rentpaid={
              String(rooms[1]).slice(0, 1).toUpperCase() +
              String(rooms[1]).slice(1)
            }
            payments={'Everyone has paid'}
          />
        </div>
      );
    } else {
      return (
        <div className="landlordcard">
          <LandlordCard
            key={index}
            id={index}
            address={rooms[0].address}
            roomkey={rooms[0].key}
            rent={rooms[0].rent}
            rentpaid={
              String(rooms[1]).slice(0, 1).toUpperCase() +
              String(rooms[1]).slice(1)
            }
            payments={''}
          />
        </div>
      );
    }
  };

  if (user === null) {
    return <Redirect to="/" />;
  } else if (landlord == true) {
    if (!rooms.length) {
      return (
        <div>
          <LandlordNavBar logout={handleLogout} />
          <h1>No properties yet head over to add room to get started</h1>
        </div>
      );
    } else {
      return (
        <div>
          <LandlordNavBar logout={handleLogout} />
          <h1>Your properties</h1>
          <div>{rooms.map(renderCards)}</div>
        </div>
      );
    }
  } else {
    return (
      <div>
        <MyNavBar logout={handleLogout} first={'Tasks'} />
        <h1 className="heading">
          {' '}
          Welcome to Roommates {user} with Room Key: {roomKey}
        </h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Name</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>{roomies.map(renderUser)}</tbody>
        </Table>
      </div>
    );
  }
}

export default Dashboard;
