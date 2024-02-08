import React, { useEffect, useState } from "react";
import "../assets/Dialog.css"
import Toast from "./Toast";
import { getData, paramsURL, postData, updateData } from "../utils/fetch";

const Room = (props) => {
    const [room, setRoom] = useState({
        id: "",
        name: "",
        price: "",
        details: "",
        numberOfPersons: "",
        type: ""
    })

    useEffect(() => {
        if (props?.status === "view") {
            getData("viewroom" + paramsURL([props?.roomID])).then((res) => {
                return res.json();
            }).then((data) => {
                setRoom(data?.[0])
            })
            .catch(err => {
                console.log(err);
            })
        }
    }, [props?.status, props?.roomID])

    useEffect(() => {
        if (props?.status === "create") {
            setRoom({
                id: "",
                name: "",
                price: "",
                details: "",
                numberOfPersons: "",
                type: ""
            })
        }
    }, [props?.status])

    const [toast, setToast] = useState({
        message: "",
        open: false,
        status: ""
    });

    const changeValues = (e, values) => {
        setRoom((oldJson) => ({
            ...oldJson,
            [values]: e.target.value
        }))
    }

    const closeDialog = () => {
        props.setDialog();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!room.name || !room.price || !room.type || !room.details || !room.numberOfPersons ) {
            setToast({
                message: "Complete all the fields from the formular!",
                open: true,
                status: "warning"
            })
        } else {
            if (props?.status === "create") {
                postData("addrooms" + paramsURL([props?.propertyID]), room).then((res) => {
                    if (res.ok) {
                        setToast({
                            message: "Room was created successfully!",
                            open: true,
                            status: "success"
                        })
                        closeDialog();
                        return res.json();
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
            } else if (props?.status === "edit") {
                updateData("editroom" + paramsURL([props?.roomID]), room).then((res) => {
                    if (res.ok) {
                        setToast({
                            message: "Room was edited successfully!",
                            open: true,
                            status: "success"
                        })
                        return res.json();
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
        }

        setTimeout(() => {
            setToast({
                message: "",
                open: false,
                status: ""
            })
        }, 3000);
    }
    
    if (props.status === "view") {
        return (
            <dialog className="dialog" open={props.dialog} >
                <div className="container">
                    <h2>{room.name} - {room.id}</h2>
                    <h3>Price: {room.price}</h3>
                    <h3>Details: {room.details}</h3>
                    <h3>Guests: {room.numberofpersons}</h3>
                    <h3>Type of bed: {room.type}</h3>
                    <div>
                        <button onClick={() => closeDialog()}>Exit</button>
                    </div>
                </div>
            </dialog>
        )
    }

    return(
            <dialog className="dialog" open={props.dialog} >
                <Toast message={toast.message} open={toast.open} status={toast.status} />
                <form className="container">
                    <h2>New Room</h2>
                    <span>
                        <label htmlFor="name">Name</label><br/>
                        <input type="text" autoComplete="off" id="name" onChange={(e) => {changeValues(e, "name")}} required/>
                    </span>
                    <span>
                        <label htmlFor="price">Price</label><br/>
                        <input type="text" autoComplete="off" id="price" onChange={(e) => {changeValues(e, "price")}} required/>
                    </span>
                    <span>
                        <label htmlFor="details">Details </label><br/>
                        <textarea type="text" id="details" rows="5" cols="20" onChange={(e) => {changeValues(e, "details")}} required/>
                    </span>
                    <span>
                        <label htmlFor="guests">Number of Guests</label><br/>
                        <input type="text" autoComplete="off" id="guests" onChange={(e) => {changeValues(e, "numberOfPersons")}} required/>
                    </span>
                    <span>
                        <label htmlFor="type">Type of room</label><br/>
                        <select name="type" id="type" onChange={(e) => {changeValues(e, "type")}}>
                            <option value="twin">Twin</option>
                            <option value="single">Single</option>
                            <option value="queen">Queen</option>
                            <option value="king">King</option>
                            <option value="apartament">Apartament</option>
                        </select>
                    </span><br/>
                    <div>
                        <button type="submit" onClick={(e) => {handleSubmit(e)}}>Save</button>
                        <button onClick={() => closeDialog()}>Cancel</button>
                    </div>
                </form>
            </dialog>
    )
}

export default Room;