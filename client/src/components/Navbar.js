import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Consumer } from "../context";

export default class Navbar extends Component {
    handleLogout = (e, store) => {
        e.preventDefault();
        localStorage.removeItem("token");
        store.logOut();
    }

    render() {
        return (
            <Consumer>
                {store => (
                    <nav className="navbar navbar-expand-md navbar-dark bg-primary py-2">
                        <Link className="navbar-brand" to="/">Navbar</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarColor01">
                            <ul className="navbar-nav ml-auto">
                                {store.state.loggedIn ? (
                                    <React.Fragment>
                                        <li className="nav-item active">
                                            <Link className="nav-link" to="#">{store.state.userName}</Link>
                                        </li>
                                        <li className="nav-item active">
                                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/logout" onClick={(e) => this.handleLogout(e, store)} className="nav-link" href="#!">Logout</Link>
                                        </li>
                                    </React.Fragment>
                                ) : (
                                        <React.Fragment>
                                            <li className="nav-item">
                                                <Link to="/login" className="nav-link" href="#!">Login</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="/register" className="nav-link" href="#!">Register</Link>
                                            </li>
                                        </React.Fragment>
                                    )}

                            </ul>
                        </div>
                    </nav>
                )}
            </Consumer>

        )
    }
}
