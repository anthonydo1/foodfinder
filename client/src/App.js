import React, { useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Home from './routes/Home';
import Signup from './routes/Signup';
import Login from './routes/Login';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    const checkLoggedIn = () => {
        if (localStorage.getItem("token") !== null) {
            setLoggedIn(true);
            return true;
        } else {
            setLoggedIn(false);
            return false;
        }
    };

    return (
        <Router>
            <Nav setLoggedIn={setLoggedIn}/>
            <Switch>
                <Route exact path="/" render={ () => (
                    checkLoggedIn() ? (
                        <Redirect to="/dashboard" />
                    ) : (
                        <Redirect to="/login" />
                    )
                )} />
                <Route path="/dashboard" exact component={Home}></Route>
                <Route path="/signup" exact component={Signup}></Route>
                <Route path="/login" exact render={ () => <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/> } /> 
            </Switch>   
        </Router>
    );
}

export default App;
