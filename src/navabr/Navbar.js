import { useState } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import './navbar.css'

const Navbar = () => {
    const [hide, setHide] = useState(false);
    const toggleHide = () => {
        setHide(!hide);
    };

    return (
        <>
            <nav className="navbar">
                <div className="nav-left">
                    <span><img src={require('../images/gear_logo.png')} alt="image not available" /></span>
                    <h1>customer portal admin console</h1>
                </div>
                <div className="nav-right">
                    <ul>
                        <li><NavLink activeclassname="active" to='/domainlist' >DomainList</NavLink></li>
                        <li><NavLink exact="true" activeclassname="active" to='/' onClick={() => localStorage.removeItem('activeTab')}>Users</NavLink></li>
                        <li><NavLink activeclassname="active" to='/company'>Company</NavLink></li>
                        <li>
                            <div className="user-dropdown">
                                <span className="sub-menu user-email" onClick={toggleHide}> <span>Administrator</span>
                                    <span></span>
                                </span>
                                <div id="subMenuSection" className="sub-menu-content d-none" style={{ display: hide ? "inline-block" : "none" }}>
                                    <ul>
                                        <li>My Account</li>
                                        <li>Lorem Ispusm</li>
                                        <li>Sign Out</li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>

                </div>
            </nav>
            <Outlet />
        </>
    )
};
export default Navbar;