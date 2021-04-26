import { useHistory, useLocation } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import HomeIcon from '@material-ui/icons/Home';

function Nav() {

    const location = useLocation().pathname;
    const active = { color: "#2196f3" };
    const inactive = { color: "#616161" };

    const isLoggedIn = () => {
        if (localStorage.getItem('token')) {
            return true;
        }
        return false;
    };

    const getUser = () => {
        const user = localStorage.getItem("user");
        if (user) {
            return user;
        };
        return null;
    };

    const history = useHistory();

    async function handleLogin(event) {
        event.preventDefault();
        if (isLoggedIn()) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        };
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
                <ul className="nav">
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
                <div className="text-white"> {getUser() ? "Logged in as " + getUser() + "  " : null}
                    <a className="btn btn-primary" onClick={handleLogin}>
                        {isLoggedIn() ? "Log out" : "Login"}
                    </a>
                </div>
                
            </div>
        </nav>
    );
}

export default Nav;