import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'reactstrap';
import UserContext from '../auth/UserContext';

function NavBar({logout}) {
    const { currentUser } = useContext(UserContext);

    function loggedinNav(){
        return(
            <>
                <NavItem>
                    <NavLink to="/tools">Tools</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/profile">{currentUser.username}</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/" onClick={logout}>Logout</NavLink>
                </NavItem>
            </>
        );
    }

    function loggedOutNav(){
        return(
            <>
                <NavItem>
                    <NavLink to='/login'>Login</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to='/signup'>Sign Up</NavLink>
                </NavItem>
            </>
        );
    }

    return(
        <Navbar expand="md">
            <NavLink exact to="/">Tool Library</NavLink>
            <Nav>{currentUser ? loggedinNav() : loggedOutNav()}</Nav>
        </Navbar>
    )
}

export default NavBar;