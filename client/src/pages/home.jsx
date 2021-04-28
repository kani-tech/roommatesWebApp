import React from "react";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom"
import '../stylesheets/home.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// Pages


const homePage = () => {

    return (
        <div class="home-body" id="box_home">


            <main role="main" class="cover">
                <div class="boxed-stuff">
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
                </div>

            </main>

            <footer class="mastfoot mt-auto">
                <div class="inner">

                </div>
            </footer>

        </div >

    )
}
export default homePage;