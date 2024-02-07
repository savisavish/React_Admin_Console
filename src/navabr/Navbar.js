import { useState } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import './navbar.css'

const Navbar = () => {
    const [hide, setHide] = useState(false);
    const toggleHide = () => {
        setHide(!hide);
    };
    const [showNav, setShowNav] = useSate(false)
    const toggleNavItems = () => {
        setShowNav(!showNav)
    }
    return (
        <>
            <nav className="navbar">
                <div className="nav-left">
                    <span><img src={require('../images/gear_logo.png')} alt="image not available" /></span>
                    <h1>customer portal admin console</h1>
                </div>
                <div className="nav-right">
                    <ul>
                        {/* <li activeClassName="active">
                            <NavLink to="/domainlist">DomainList</NavLink>
                        </li>
                        <li activeClassName="active">
                            <NavLink to="/">Users</NavLink>
                        </li>
                        <li activeClassName="active">
                            <NavLink to="/company">Company</NavLink>
                        </li> */}
                        <li><NavLink activeclassname="active" to='/domainlist' >DomainList</NavLink></li>
                        <li><NavLink exact="true" activeclassname="active" to='/'>Users</NavLink></li>
                        <li><NavLink activeclassname="active" to='/company'>Company</NavLink></li>
                        <li>
                            <div className="user-dropdown">
                                <span className="sub-menu user-email" onClick={toggleHide}> <span>Administrator</span>
                                    <span>{/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99674 11L12.6634 6.33333L11.3301 5L7.99674 8.33333L4.66341 5L3.33008 6.33333L7.99674 11Z" fill="black" />
                                    </svg> */}</span>
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