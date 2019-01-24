import React, { Component } from 'react'

const Context = React.createContext();

export class Provider extends Component {
    state = {
        loggedIn: false,
        userName: "",
        userEmail: "",
    }

    verifyToken = async () => {
        const token = localStorage.getItem("token");

        if (!token) return null;

        const response = await fetch("/api/users/verifyToken", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": token
            }
        })

        const body = await response.json();

        if (body.success) {
            return {
                userName: body.name,
                userEmail: body.email,
                loggedIn: true
            }
        }
    }

    componentDidMount = () => {
        this.verifyToken()
            .then(res => {
                if (!res) return null
                this.setState({
                    userName: res.userName,
                    userEmail: res.userEmail,
                    loggedIn: res.loggedIn
                })
            }
            )
            .catch(err => console.log(err))
    }


    componentDidUpdate = async () => {
        this.verifyToken()
            .then(res => {
                if (!res) return null
                this.setState({
                    userName: res.userName,
                    userEmail: res.userEmail,
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Context.Provider value={{
                state: this.state,
                logIn: () => this.setState({ loggedIn: true }),
                logOut: () => this.setState({
                    userName: "",
                    userEmail: "",
                    loggedIn: false
                })
            }}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;
