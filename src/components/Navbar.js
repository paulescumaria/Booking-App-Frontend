import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import "../assets/Navbar.css"

const Navbar = () => {
    const { user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem("user");
        setUser({
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            accountType: "",
          })
        navigate("/login");
    }

    return(
        <section className="navbar">
            <Link className="link" to="/">Home Page</Link>
            { user?.accountType === "owner" ? 
            <>
                <Link className="link" to="/property/create">Create a property</Link>
                <Link className="link" to="/property/list">View all properties</Link>
            </> 
            : 
            <></>}
            { user?.id &&  
            <button onClick={() => {logOut();}}>
                Log out
            </button>}
        </section>
    )
}

export default Navbar;