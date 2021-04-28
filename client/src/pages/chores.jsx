import React, { useState, useEffect } from "react";
import ToDoItem from "../components/todoitem.jsx";
import axios from 'axios'
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom"
import MyNavBar from '../components/navbar.jsx'
import Table from 'react-bootstrap/Table'


function ChoresTDL() {
    const [inputText, setInputText] = useState("");
    const [choreInputText, setChoreInputText] = useState("");
    const [choreInputName, setChoreInputName] = useState("");
    const [items, setItems] = useState([]);
    const [roomKey, setRoomKey] = useState("");
    const [roomies, setRoomies] = useState([]);
    const [user, setUser] = useState("");
    const [flipper, setFlipper] = useState(0);
    const [chores, setChores] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    setTimeout(function () {
        const currUser = JSON.parse(localStorage.getItem('user'));
        if (currUser) {
            setUser(currUser.name);
            setRoomKey(currUser.roomKey);
        } else {
            setUser(null)
        }
    }, 1);

    const schedule = require('node-schedule');

    const job = schedule.scheduleJob('* * * * 0', async function () {

        async function getNames() {
            const response = await axios({
                url: 'http://localhost:4000/api/dashboard',
                method: 'post',
                // data: payload
            })

            console.log(response.data.roommates)
            setRoomies(response.data.roommates)

        }
        getNames();


        console.log('The answer to life, the universe, and everything!');
    });

    useEffect(() => {
        console.log(10000);
        console.log(flipper);
        const payload = {
            roomkey: roomKey
        }
        async function getToDos() {
            const response = await axios({
                url: 'http://localhost:4000/api/toDoDisplay',
                method: 'post',
                data: payload
            })
            setItems(response.data.items);
        }

        async function getChores() {
            const response = await axios({
                url: 'http://localhost:4000/api/choresDisplay',
                method: 'post',
                data: payload
            })
            setChores(response.data.items);
            console.log(chores);
        }
        getChores();
        getToDos();

    }, [roomKey, flipper])

    console.log(flipper);
    //console.log(items)
    function addItem() {

        console.log(roomKey);

        setFlipper(flipper + 1);

        const payload = {
            item: inputText,
            roomKey: roomKey
        }
        async function addTodo() {
            const response = await axios({
                url: 'http://localhost:4000/api/toDo',
                method: 'post',
                data: payload
            })
            if (response.data.token == 1234) {
                setFlipper(flipper + 1);
            }
        }
        addTodo()
        setInputText("");

        setFlipper(flipper + 1);
        console.log(flipper);
    }

    function addChores() {
        setFlipper(flipper + 1);

        const payload = {
            item: choreInputText,
            name: choreInputName.charAt(0).toUpperCase() + choreInputName.slice(1),
            roomKey: roomKey,
            checked: false
        }
        console.log(payload);
        async function addChore() {
            const response = await axios({
                url: 'http://localhost:4000/api/chore',
                method: 'post',
                data: payload
            })
            if (response.data.token == 1234) {
                console.log("success");
                document.getElementById("error").innerHTML = ""
            } else {
                let error = document.getElementById("error");
                error.innerHTML = "<span style='color: red;'>" +
                    "Please enter the name of a roommate</span>"
                console.log("fail");
            }
            setFlipper(flipper + 1);
        }

        addChore()
        setChoreInputText("");
        setChoreInputName("");

        setFlipper(flipper + 1);
        console.log(flipper);
    }



    const renderItem = (todos, index) => {
        return (
            <li>
                <ToDoItem
                    key={index}
                    text={todos.Item}
                    id={index}
                    onChecked={deleteItem} /></li>
        )
    }

    const renderChore = (chores, index) => {
        return (
            <tr key={index}>
                <td>{chores.Item}</td>
                <td>{chores.Name}</td>
                <td><input
                    name="checked"
                    type="checkbox"
                    id={index}
                    checked={chores.Checked}
                    onChange={updateChoreCheck.bind(index, chores.Checked)} /></td>
            </tr>
        )
    }

    function updateChoreCheck(checked, chore) {
        const payload = {
            Item: chores[chore.target.id].Item,
            Checked: checked,
        }
        console.log(payload);

        async function choreCheck() {
            const response = await axios({
                url: 'http://localhost:4000/api/choreCheck',
                method: 'post',
                data: payload
            })
            console.log(response);
        }
        choreCheck();
        setFlipper(flipper + 1);
    }

    function deleteItem(id) {
        console.log(id);
        const payload = {
            itemID: items[id]._id
        }

        async function deleteTodo() {
            const response = await axios({
                url: 'http://localhost:4000/api/toDoDelete',
                method: 'post',
                data: payload
            })
        }
        console.log(items[id]._id)
        deleteTodo()
        setItems(prevItems => {
            return prevItems.filter((item, index) => {
                return index !== id;
            });
        });

    }

    const handleLogout = () => {
        setUser({});
        setEmail("");
        setPassword("");
        localStorage.clear();
    };

    return (
        <div className="container">
            <MyNavBar logout={handleLogout} />
            <div className="heading">
                <h1>To-Do List</h1>
            </div>
            <div className="form">
                <input onChange={e => setInputText(e.target.value)} type="text" value={inputText} />
                <button onClick={addItem}>
                    <span>Add</span>
                </button>
            </div>
            <div>
                <ul>
                    {items.map(renderItem)}
                </ul>
            </div>

            <div className="heading">
                <h1>Chores List</h1>
            </div>
            <div className="form">
                <span>Item </span>
                <input onChange={e => setChoreInputText(e.target.value)} type="text" value={choreInputText} />
                <span> Name </span>
                <input onChange={e => setChoreInputName(e.target.value)} type="text" value={choreInputName} />
                <button onClick={addChores}>
                    <span>Add</span>
                </button>
            </div>
            <span id="error"></span>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Chore</th>
                        <th>Name</th>
                        <th>Completion</th>
                    </tr>
                </thead>
                <tbody>
                    {chores.map(renderChore)}
                </tbody>
            </Table>
        </div>
    );
}

export default ChoresTDL;