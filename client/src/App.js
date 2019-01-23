import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    message: ""
  }

  componentDidMount() {
    this.getMessage()
      .then(res => { this.setState({ message: res.message }) })
      .catch(err => console.log(err))
  }

  getMessage = async () => {
    const response = await fetch("/api/index");
    const body = await response.json();

    // if (response !== 200) throw Error(body.message);
    return body;
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
