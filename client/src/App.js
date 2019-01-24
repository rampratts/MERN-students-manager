import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

//Provider
import { Provider } from "./context";

//Components
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Test from "./components/Test";

class App extends Component {

  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/test" component={Test} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
