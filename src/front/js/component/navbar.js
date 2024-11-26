import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Logo from "../../img/Logo.png";
import gear from "../../img/gear.png";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const username = store.username;

    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.search.value;
        actions.search(query);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={Logo} alt="Logo" width="30" height="30" className="d-inline-block align-top" />
                </Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/listingpage">Listing Page</Link>
                        </li>
                    </ul>
                    <form className="d-flex" onSubmit={handleSearch}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            name="search"
                        />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
                {/* Conditional Login/Logout */}
                {username ? (
                    <>
                        <span className="navbar-text ms-3">Hello, {username}</span>
                        <button className="btn btn-outline-danger ms-3" onClick={() => actions.logout()}>Logout</button>
                    </>
                ) : (
                    <button className="btn btn-outline-primary ms-3" onClick={() => actions.login()}>Login</button>
                )}
                {/* Dropdown Menu */}
                <div className="dropdown ms-3">
                    <img
                        src={gear}
                        alt="Profile"
                        width="40"
                        height="40"
                        className="rounded-circle dropdown-toggle"
                        id="profileDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ cursor: "pointer" }}
                    />
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                        <li><span className="dropdown-item-text">Hello, {username || "Guest"}</span></li>
                        <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                        <li><Link className="dropdown-item" to="/favorites">Favorites</Link></li>
                        <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className="dropdown-item" onClick={() => actions.logout()}>Logout</button></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
