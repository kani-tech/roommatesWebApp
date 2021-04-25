import React, { useState, useEffect } from "react";
import ToDoItem from "../components/todoitem.jsx";
import axios from 'axios'
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom"
import MyNavBar from '../components/navbar.jsx'

function ChoresTDL() {
    const [inputText, setInputText] = useState("");
    const [items, setItems] = useState([]);
    const [roomKey, setRoomKey] = useState("");
    const [user, setUser] = useState("");
    const [flipper, setFlipper] = useState(true)

    setTimeout(function () {
        const currUser = JSON.parse(localStorage.getItem('user'));
        if (currUser) {
            setUser(currUser.name);
            setRoomKey(currUser.roomKey)
        } else {
            setUser(null)
        }
    }, 1);


    useEffect(() => {
        console.log(10000);
        const payload = {
            roomkey: roomKey
        }
        async function getToDos() {
            const response = await axios({
                url: 'http://localhost:4000/api/choresdisplay',
                method: 'post',
                data: payload
            })

            setItems(response.data.items)

        }
        getToDos();

    }, [roomKey, flipper])

    console.log(items)
    function addItem() {
        /*setItems(prevItems => {
            return [...prevItems, inputText];
        });*/

        const payload = {
            item: inputText,
            roomKey: roomKey
        }
        async function addTodo() {
            const response = await axios({
                url: 'http://localhost:4000/api/chores',
                method: 'post',
                data: payload
            })
        }
        addTodo()
        setInputText("");


        if (flipper) {
            setFlipper(false)
        } else {
            setFlipper(true)
        }
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
    function deleteItem(id) {
        console.log(id);
        const payload = {
            itemID: items[id]._id
        }

        async function deleteTodo() {
            const response = await axios({
                url: 'http://localhost:4000/api/choresdelete',
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

    return (
        <div className="container">
            <MyNavBar />
            <div className="heading">
                <h1>To-Do List</h1>
            </div>
            <div className="form">
                <input onChange={e => setInputText(e.target.value)}/*{handleChange}*/ type="text" value={inputText} />
                <button onClick={addItem}>
                    <span>Add</span>
                </button>
            </div>
            <div>
                <ul>
                    {items.map(renderItem)}
                </ul>
            </div>
        </div>
    );
}

export default ChoresTDL;