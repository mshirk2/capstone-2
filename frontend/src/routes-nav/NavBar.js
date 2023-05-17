import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'reactstrap';
import UserContext from '../auth/UserContext';
import toolLibraryLogo from "../images/screwdriver-wrench-solid.svg";

import './NavBar.css';

function NavBar({logout}) {
    const { currentUser } = useContext(UserContext);

    function loggedinNav(){
        return(
            <>
                <NavItem>
                    <NavLink to="/tools" className="nav-link">Tools</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to={`/users/${currentUser.id}`} className="nav-link">{currentUser.username}</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/" onClick={logout} className="nav-link">Logout</NavLink>
                </NavItem>
            </>
        );
    }

    function loggedOutNav(){
        return(
            <>
                <NavItem>
                    <NavLink to='/login' className="nav-link">Login</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to='/signup' className="nav-link">Sign Up</NavLink>
                </NavItem>
            </>
        );
    }

    return(
        <Navbar expand="md" className='Navbar mb-4'>
            <NavLink exact to="/" className="navbar-brand nav-link">
                <img src={toolLibraryLogo} alt="Tool Library Logo" width="30" height="30" />
                Tool Library
            </NavLink>
            <Nav className='ml-auto'>
                {currentUser ? loggedinNav() : loggedOutNav()}
            </Nav>
        </Navbar>
    )
}

export default NavBar;