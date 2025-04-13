import React from "react";
import { FaBook } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store";
import "./Navbar.css";

const Navbar = () => {

    const dispatch = useDispatch()

    // Take initial state from store
    const IsLoggedIn = useSelector((state) => state.IsLoggedIn);

    // logout
    const logout = () => {
        dispatch(authActions.logout());
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token")
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <b>
                    <Link className="navbar-brand" to="/">
                        <FaBook /> &nbsp; Todo
                    </Link>
                </b>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                        <Link className="nav-link active" to="/">Home</Link>
                        <Link className="nav-link active" to="/todo">Todo</Link>
                        <Link className="nav-link active" to="/aboutus">About Us</Link>
                        {
                            !IsLoggedIn && 
                            <>
                                                    <Link className="nav-link active auth-btn" to="/signup">SignUp</Link>
                                                    <Link className="nav-link active auth-btn" to="/signin">SignIn</Link>
                            </>
                        }

                        {
                            IsLoggedIn &&
                            <Link className="nav-link active auth-btn" to="/" onClick={logout}>Log Out</Link>
                        }

                    </div>
                </div>

                {/* Profile image placeholder (optional) */}
                {/* <img className="profile-image" src="/assets/user-profile-icon.png" alt="Profile" /> */}
            </div>
        </nav>
    );
};

export default Navbar;
