import React, { Component } from 'react'
import { Consumer } from "../context";
import { TokenPrefix } from "../keys";

export default class Login extends Component {
    state = {
        email: "",
        password: "",
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = async (e, store) => {
        e.preventDefault();

        const { email, password } = this.state;

        const response = await fetch("/api/users/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })

        const body = await response.json();
        const token = body.token;

        if (token) {
            localStorage.setItem("token", `${TokenPrefix} ${token}`);
            store.logIn();
        } else {
            alert("Wrong credentials");
        }
    }

    render() {
        return (
            <Consumer>
                {(store) => (
                    <div>
                        <div className="mt-3">
                            <h1 className="mb-3">Login</h1>
                            <form onSubmit={async (e) => this.handleSubmit(e, store)}>
                                <div className="form-group row mx-auto">
                                    <label htmlFor="email" className="col-sm-2 col-form-label">Introduce your email</label>
                                    <div className="col-sm-6">
                                        <input type="email" name="email" id="email" required className="form-control" placeholder="Email"
                                            onChange={this.onChange}
                                            value={this.state.email}
                                        />
                                    </div>
                                </div>

                                <div className="form-group row mx-auto">
                                    <label htmlFor="password1" className="col-sm-2 col-form-label">Introduce your password</label>
                                    <div className="col-sm-6">
                                        <input type="password" name="password" id="password1" required className="form-control" placeholder="Password"
                                            onChange={this.onChange}
                                            value={this.state.password}
                                        />
                                    </div>
                                </div>
                                <input type="submit" value="Login" className="btn btn-success col-md-3 offset-md-2" />
                            </form>
                        </div>
                    </div>
                )}
            </Consumer>
        )
    }
}