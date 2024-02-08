import React, { useContext, useState } from "react";
import "../assets/Login.css";
import Toast from "../components/Toast";
import { postData } from "../utils/fetch";
import { UserContext } from "../App";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const [toast, setToast] = useState({
        message: "",
        open: false,
        status: "",
    });

    const changeValues = (e , values) => {
        setValues((oldJson) => ({
            ...oldJson,
            [values]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!values.email || !values.password) {
            setToast({
                message: "Complete all the fields from the formular!",
                open: true,
                status: "warning"
            })
        } else {
            postData("login", values).then((res) => {
                if (res.ok) {
                    setToast({
                        message: "Login successfully!",
                        open: true,
                        status: "success",
                    })
                    return res.json();
                } else if (res.status === 400){
                    setToast({
                        message: "Password or email incorrect!",
                        open: true,
                        status: "warning"
                    })
                } else {
                    setToast({
                        message: "Something went wrong!",
                        open: true,
                        status: "error"
                    })
                }
               }).then((data) => {
                const userData = {
                    id: data.id,
                    firstName: data.firstname,
                    lastName: data.lastname,
                    email: data.email,
                    accountType: data.accounttype,
                }
                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
                navigate("/");
               }).catch(err => {
                console.log(err);
               })
        }

        setTimeout(() => {
            setToast({
                message: "",
                open: false,
                status: ""
            })
        }, 3000);
    }
    
    return(
        <div>
        <Toast message={toast.message} open={toast.open} status={toast.status} />
        <form className="container">
            <h1>Login Page</h1>
            <span>
                <label htmlFor="email">Email </label><br/>
                <input type="text" id="email" onChange={(e) => changeValues(e, "email")} required/>
            </span>
            <span>
                <label htmlFor="pass">Password </label><br/>
                <input type="password" autoComplete="off" id="pass" onChange={(e) => changeValues(e, "password")} required/>
            </span><br/>
            <button type="submit" onClick={(e) => handleSubmit(e)}>Log in</button><br/>
            <div>
                <Link className="link" to="/register">Register</Link>
            </div>
        </form>
        </div>
    )
}

export default Login;