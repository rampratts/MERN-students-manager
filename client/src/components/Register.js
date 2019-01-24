import React, { Component } from 'react';
import { Consumer } from "../context";

class Register extends Component {

    state = {
        name: "",
        email: "",
        password1: "",
        password2: ""
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = async e => {
        e.preventDefault();
        const { name, email, password1, password2 } = this.state;

        if (password1 !== password2) {
            return alert("Passwords dont match");
        }

        const newUser = {
            name,
            email,
            password: password1
        }

        const response = await fetch("/api/users/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
        })

        const body = await response.json();
        if (body.success === true) {
            alert("User created")
        } else if (body.code === 11000) {
            alert("Email already registered");
        } else {
            alert("An error ocured");
        }
    }
    render() {
        const page = (<div className="mt-3">
            <h1 className="mb-3">Add new user</h1>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group row mx-auto">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Introduce your name</label>
                    <div className="col-sm-6">
                        <input type="text" name="name" id="name" required className="form-control" placeholder="Name"
                            onChange={this.onChange}
                            value={this.state.name}
                        />
                    </div>
                </div>

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
                        <input type="password" name="password1" id="password1" required className="form-control" placeholder="Password"
                            onChange={this.onChange}
                            value={this.state.password1}
                        />
                    </div>
                </div>

                <div className="form-group row mx-auto">
                    <label htmlFor="password2" className="col-sm-2 col-form-label">Introduce your password, again</label>
                    <div className="col-sm-6">
                        <input type="password" name="password2" id="password2" required className="form-control" placeholder="Password"
                            onChange={this.onChange}
                            value={this.state.password2}
                        />
                    </div>
                </div>

                <input type="submit" value="Register" className="btn btn-success col-md-3 offset-md-2" />
            </form>
        </div>)
        return (
            <Consumer>
                {store => (
                    <React.Fragment>
                        {store.state.loggedIn ? this.props.history.push("/") : page}
                    </React.Fragment>
                )}
            </Consumer>
        )
    }
}

export default Register;