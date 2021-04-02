import React from "react";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom"
import '../stylesheets/home.css'
import 'bootstrap/dist/css/bootstrap.min.css';
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
        <div class="text-center home-body">
            <div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
                <header class="masthead mb-auto">
                    <div class="inner">
                        <h3 class="masthead-brand">Roomates.</h3>
                    </div>
                </header>

                <main role="main" class="inner cover">
                    <h1 class="cover-heading">Roomates.</h1>
                    <p class="lead">Stay connected.</p>

                    <p class="lead">
                        <Link to="/login">
                            <button type="button" class="btn btn-lg btn-secondary" >
                                Login
     </button>
                        </Link>
                        <Link to="/register">
                            <button type="button" class="btn btn-lg btn-secondary">
                                Register
                </button>
                        </Link>
                    </p>
                </main>

                <footer class="mastfoot mt-auto">
                    <div class="inner">
                        <p>Cover template for <a href="https://getbootstrap.com/">Bootstrap</a>, by <a href="https://twitter.com/mdo">@mdo</a>.</p>
                    </div>
                </footer>
            </div>
        </div>

    )
}
export default homePage;