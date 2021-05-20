import React, {useState, useEffect, componentDidMount} from 'react';
import Request from '../components/requestPost.jsx';
import axios from 'axios';
import {BrowserRouter, Route, Switch, Link, Redirect} from 'react-router-dom';
import MyNavBar from '../components/navbar.jsx';
import '../stylesheets/complaints.css';

function Complaints() {
  const [roomKey, setRoomKey] = useState('');
  const [user, setUser] = useState('');
  const [title, setTitle] = useState('');
  const [request, setRequest] = useState('');
  const [posts, setPosts] = useState([]);
  const [flipper, setFlipper] = useState(true);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  setTimeout(function () {
    const currUser = JSON.parse(localStorage.getItem('user'));
    if (currUser) {
      setRoomKey(currUser.roomKey);
    }
  }, 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (flipper) {
      setFlipper(false);
    } else {
      setFlipper(true);
    }

    const payload = {
      roomkey: roomKey,
      title: title,
      request: request,
    };

    const response = await axios({
      url: '/api/addrequest',
      method: 'post',
      data: payload,
    });

    e.target.reset();
    console.log(response);
  };

  //

  console.log(flipper);

  useEffect(() => {
    getComplaints();
  }, [roomKey, flipper]);

  const getComplaints = async () => {
    const payload = {
      roomkey: roomKey,
    };
    const response = await axios({
      url: '/api/getcomplaints',
      method: 'post',
      data: payload,
    });
    console.log(response);
    setPosts(response.data.requests);
  };

  const renderPosts = (posts, index) => {
    return (
      <div>
        <Request
          key={index}
          id={index}
          title={posts.title}
          text={posts.request}
        />
      </div>
    );
  };

  const displayPost = (posts) => {
    if (!posts.length) {
      return null;
    } else {
      return posts.map((post, index) => (
        <div key={index} className="complaints">
          <h3>{post.title}</h3>
          <p>{post.request}</p>
        </div>
      ));
    }
  };

  const handleLogout = () => {
    setUser({});
    setEmail('');
    setPassword('');
    localStorage.clear();
  };

  return (
    <div>
      <MyNavBar logout={handleLogout} />

      <div className="main-div">
        <h1 className="request"> Enter your request </h1>
        <form onSubmit={handleSubmit} className="main-form">
          <div className="form-request">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-request">
            <textarea
              placeholder="body"
              name="body"
              cols="50"
              rows="5"
              value={request}
              onChange={(e) => setRequest(e.target.value)}
            ></textarea>
          </div>

          <button>Submit</button>
        </form>
      </div>

      <div className="complaints">{posts.map(renderPosts)}</div>
    </div>
  );
}

export default Complaints;
