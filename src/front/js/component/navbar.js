import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"; // Adjust path if needed
import Logo from "../../img/Logo.png";
import gear from "../../img/gear.png";

export const Navbar = () => {
	const { store, actions } = useContext(Context); // Access Flux store and actions
    const username = store.username || "Guest"; // Default to "Guest" if username is not set

    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.search.value;
        actions.search(query); // Implement search action in your Flux store
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
				<img src={Logo} alt="Logo" width="30" height="30" className="d-inline-block align-top" /> {/* Replace with your logo */}
                </Link>
				<span className="navbar-text ms-3">Hello, {username}</span> {/* Display username */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/listingpage">Listing Page</Link> {/* Link to ListingPage */}
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
				{/* Dropdown Menu */}
<div className="dropdown">
    <img
        src={gear} // Replace with the path to your image
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
        <li><span className="dropdown-item-text">Hello, {username}</span></li>
        <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
        <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
        <li><hr className="dropdown-divider" /></li>
        <li><button className="dropdown-item" onClick={() => actions.logout()}>Logout</button></li>
    </ul>
</div>

            </div>
        </nav>
    );
};