import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons'; // Import the home icon

const NavBar = () => {
    const { user, setUser } = useContext(UserContext);
    const location = useLocation();

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <nav>
            {user ? (
                <ul>
                    <li>
                        <Link to="/shortlisted" className="saved-awbs-button">
                            Your Saved AWBs
                        </Link>
                    </li>
                    <li>
                        <Link to="/" onClick={handleSignOut}>
                            Sign Out
                        </Link>
                    </li>
                </ul>
            ) : (
                <ul>
                    <li>
                        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                            <FontAwesomeIcon icon={faHome} className="home-icon" /> {/* Replace "Home" with the icon */}
                        </Link>
                    </li>
                    <li>
                        <Link to="/sign-up" className={location.pathname === '/sign-up' ? 'active' : ''}>
                            Sign Up
                        </Link>
                    </li>
                    <li>
                        <Link to="/sign-in" className={location.pathname === '/sign-in' ? 'active' : ''}>
                            Sign In
                        </Link>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default NavBar;