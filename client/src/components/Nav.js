import { useHistory, useLocation } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import HomeIcon from '@material-ui/icons/Home';

function Nav(props) {

    const location = useLocation().pathname;
    const active = { color: "#2196f3" };
    const inactive = { color: "#616161" };
    
    const isLoggedIn = () => {
        if (localStorage.getItem('token')) {
            return true;
        }
        return false;
    };

    const history = useHistory();

    async function handleLogin(event) {
        event.preventDefault();
        if (isLoggedIn()) {
            localStorage.removeItem("token");
        };
        props.setLoggedIn(false);
        history.push("/login");
    };

    function isActive(path) {
        if (path === location) {
            return active;
        };
        return inactive;
    }

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/">Food Finder</a>
                <ul className="nav justify-content-center">

                    <li className="nav-item mr-2">
                        <a className="btn" href="/dashboard">
                            <HomeIcon fontSize="large" style={isActive("/dashboard")} />
                        </a>
                    </li>

                    <li className="nav-item mr-2">
                        <a className="btn" href="/search">
                            <SearchIcon fontSize="large" style={isActive("/search")} />
                        </a>
                    </li>

                    <li className="nav-item mr-2">
                        <a className="btn" href="/friends">
                            <PeopleOutlineIcon fontSize="large" style={isActive("/friends")} />
                        </a>
                    </li>

                </ul>

                <a className="btn btn-primary" onClick={handleLogin}>
                    {isLoggedIn() ? "Log out" : "Login"}
                </a>
            </div>
        </nav>
    );
}

export default Nav;