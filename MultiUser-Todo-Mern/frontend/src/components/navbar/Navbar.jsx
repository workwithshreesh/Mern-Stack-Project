import React from "react";
import { FaBook } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <b><Link className="navbar-brand" to="/">
                    <FaBook /> &nbsp;
                    Todo
                </Link></b>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                        <Link className="nav-link active" to="/">Home</Link>
                        <Link className="nav-link active" to="/todo">Todo</Link>
                        <Link className="nav-link active" to="/aboutus">About Us</Link>
                        <Link className="nav-link active auth-btn" to="/signup">SignUp</Link>
                        <Link className="nav-link active auth-btn" to="/signin">SignIn</Link>
                        <Link className="nav-link active auth-btn" href="/logout">Log Out</Link>
                    </div>
                </div>
                {/* <img className="profile-image navbar-nav ms-auto" src="/assets/user-profile-icon.png" alt="Profile" /> */}

            </div>
        </nav>
    );
};

export default Navbar;
