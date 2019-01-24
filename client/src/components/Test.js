import React, { Component } from 'react';
import { Consumer } from "../context";

export default class Test extends Component {
    render() {
        return (
            <Consumer>
                {store => (
                    <div>
                        {!store.state.loggedIn ? (<h1>No estás autorizado</h1>) : (<h1>Sí lo estás 😸</h1>)}
                    </div>
                )}
            </Consumer>
        )
    }
}
