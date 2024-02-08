import React, { useState } from "react";
import { postData } from "../utils/fetch";
import Toast from "../components/Toast";
import { Link } from "react-router-dom";

const Register = () => {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        accountType: "",
    });

    const [toast, setToast] = useState({
        message: "",
        open: false,
        status: ""
    });

    const changeValues = (e , values) => {
        setValues((oldJson) => ({
            ...oldJson,
            [values]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        var mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        if (!values.firstName || !values.lastName || !values.email || !values.accountType || !values.password) {
            setToast({
                message: "Complete all the fields from the formular!",
                open: true,
                status: "warning"
            })
        } else if (!values.email.match(mailformat)) {
            setToast({
                message: "Email invalid!",
                open: true,
                status: "warning"
            })
        } else if (values.password.length < 6 ) {
            setToast({
                message: "Password is too weak!",
                open: true,
                status: "warning"
            })
        } else {
           postData("register", values).then((res) => {
            if (res.ok) {
                setToast({
                    message: "Register successfully!",
                    open: true,
                    status: "success"
                })
                return res.json();
            } else if (res.status === 409) {
                setToast({
                    message: "Email already exist!",
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
            <h1>Register Page</h1>
            <span>
                <label htmlFor="first">First Name </label><br/>
                <input type="text" id="first" onChange={(e) => changeValues(e, "firstName")} required/>
            </span>
            <span>
                <label htmlFor="last">Last Name </label><br/>
                <input type="text" id="last" onChange={(e) => changeValues(e, "lastName")} required/>
            </span>
            <span>
                <label htmlFor="email">Email </label><br/>
                <input type="text" id="email" onChange={(e) => changeValues(e, "email")} required/>
            </span>
            <span>
                <label htmlFor="pass">Password </label><br/>
                <input type="password" autoComplete="off" id="pass" onChange={(e) => changeValues(e, "password")} required/>
            </span>
            <span>
                <input type="radio" name="account" id="client" value="client" onChange={(e) => changeValues(e, "accountType")} required/>
                <label htmlFor="client">Client</label>
                <input type="radio" name="account" id="owner" value="owner" onChange={(e) => changeValues(e, "accountType")} required />
                <label htmlFor="owner">Owner</label>
            </span>
            <button type="submit" onClick={(e) => handleSubmit(e)}>Register</button><br/>
            <div>
                <Link className="link" to="/login">Login</Link>
            </div>
        </form>
        </div>
    )
}

export default Register;