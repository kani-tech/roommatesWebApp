import React from "react";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom"
import '../stylesheets/home.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// Pages

/* const homePage = () => {

    return (
        <body className="text-center">
            <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
                <header className="masthead mb-auto">
                    <h3>Welcome to roomates</h3>
                </header>

                <Link to="/login">
                    <button type="button" >
                        Login
     </button>
                </Link>
                <Link to="/register">
                    <button type="button">
                        Register
                </button>
                </Link>
            </div>
        </body>

    )
} */

const homePage = () => {

    return (
        <div class="home-body" id="box_home">


            <main role="main" class="inner cover">
                <div class="text">
                    <h1 class="cover-heading">Roomates</h1>
                    <p class="lead">Bringing students together.</p>
                </div>


                <Link to="/login">
                    <button type="button" class="btn btn-lg btn-secondary" id="log_btn">
                        Login
                            </button>
                </Link>
                <Link to="/register">
                    <button type="button" class="btn btn-lg btn-secondary" id="reg_btn">
                        Register
                            </button>
                </Link>

            </main>

            <footer class="mastfoot mt-auto">
                <div class="inner">

                </div>
            </footer>

        </div >

    )
}
export default homePage;