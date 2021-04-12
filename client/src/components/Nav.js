import React from 'react';
import { useHistory } from 'react-router-dom';

function Nav(props) {

    const isLoggedIn = () => {
        if (localStorage.getItem('token')) {
            return true;
        }
        return false;
    };

    const history = useHistory();
    const redirect = () => history.push("/login");

    async function handleSubmit(event) {
        event.preventDefault();
        if (isLoggedIn()) {
            localStorage.removeItem("token");
        };
        props.setLoggedIn(false);
        redirect();
    };

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/">Food Finder</a>
                <a className="btn btn-primary" onClick={handleSubmit}>
                    {isLoggedIn() ? "Log out" : "Login"}
                </a>
            </div>
        </nav>
    );
}

export default Nav;