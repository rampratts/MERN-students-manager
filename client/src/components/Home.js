import React, { Component } from 'react'
import { Consumer } from "../context";

export default class Home extends Component {
    render() {
        const page = (
            <h1>Home</h1>
        )
        return (
            <Consumer>
                {store => (
                    <React.Fragment>
                        {store.state.loggedIn ? page : this.props.history.push("/login")}
                    </React.Fragment>
                )}
            </Consumer>
        )
    }
}
