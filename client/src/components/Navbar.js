import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-primary py-2">
                <a className="navbar-brand" href="#!">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link" href="#!">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="nav-link" href="#!">Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/test" className="nav-link" href="#!">Protected Route</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/logout" className="nav-link" href="#!">Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
