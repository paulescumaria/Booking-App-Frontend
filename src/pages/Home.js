import React, { useContext } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

const Home = () => {
    const { user } = useContext(UserContext);

    return(
        <div className="container">
            <h2>Welcome to Home{ user?.firstName ? `, ${user.firstName}!` : "! Log in or Register!"}</h2>
            {!user?.id && 
            <>
                <Link to="/login">Login</Link><br/>
                <Link to="/register">Register</Link><br/>
            </>}
        </div>
    )
}

export default Home;