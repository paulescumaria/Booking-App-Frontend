import React, { useContext, useEffect, useState } from "react";
import { deleteData, getData, paramsURL, postData, updateData } from "../utils/fetch";
import Toast from "../components/Toast";
import { UserContext } from "../App";
import { useLocation } from "react-router-dom";
import Room from "../components/Room";

const Property = () => {
    const { user } = useContext(UserContext);
    const location = useLocation();
    const data = location.state;
    const [dialog, setDialog] = useState(false);
    const [values, setValues] = useState([{
        id: "",
        name: "",
        price: "",
        details: "",
        numberOfPersons: "",
        type: ""
    }]);
    const [count, setCount] = useState(0);

    const [renderRoom, setRenderRoom] = useState({
        id: "",
        status: ""
    });

    const [rooms, setRooms] = useState([{
        id: "",
        name: "",
        price: "",
        details: "",
        numberOfPersons: "",
        type: ""
    }])

    const [toast, setToast] = useState({
        message: "",
        open: false,
        status: ""
    });

    useEffect(() => {
        if(data?.status === "view" || data?.status === "edit" ) {
            getData("viewproperty" + paramsURL([data?.id])).then((res) => {
                return res.json();
            }).then((data) => {
                setValues(data[0])
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })
        } else {
            setValues({
                name: "",
                description: "",
                phone: "",
                address: "",
                country: "",
                city: "",
                type: "",
            })
        }
    }, [data?.id, data?.status])

    useEffect(() => {
        if(data?.status === "view") {
            getData("viewrooms" + paramsURL([data?.id])).then((res) => {
                return res.json();
            }).then((data) => {
                setRooms(data)
            })
            .catch(err => {
                console.log(err);
            })
        }
    }, [data?.id, data?.status, count])


    const changeValues = (e, values) => {
        setValues((oldJson) => ({
            ...oldJson,
            [values]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!values.name || !values.description || !values.type || !values.phone || !values.address || !values.country || !values.city) {
            setToast({
                message: "Complete all the fields from the formular!",
                open: true,
                status: "warning"
            })
        } else {
            if (user?.id) {
                if(data?.status === "edit") {
                    updateData("editproperty" + paramsURL([data?.id]), values)
                    .then((res) => {
                        if (res.ok) {
                            setToast({
                                message: "Property was edited successfully!",
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
                } else {
                    postData("createproperty" + paramsURL([user?.id]), values)
                    .then((res) => {
                        if (res.ok) {
                            setToast({
                                message: "Property was created successfully!",
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
        }

        setTimeout(() => {
            setToast({
                message: "",
                open: false,
                status: ""
            })
        }, 3000);
    }

    const deleteRoomCallback = (roomID) => {
        deleteData("removeroom" + paramsURL([roomID])).then((res) => {
            if(res.ok) {
                setToast({
                    message: "Room was deleted successfully!",
                    open: true,
                    status: "success"
                })
            }
            setCount(count + 1);
            setTimeout(() => {
                setToast({
                    message: "",
                    open: false,
                    status: ""
                })
            }, 3000);
        })
    }

    const roomCallback = (roomID, state) => {
        setRenderRoom({ id: roomID, status: state});
        setDialog(!dialog);
    }

    const resetDialog = () => {
        setDialog(!dialog);
        setRenderRoom({
            id: "",
            status: ""
        });
    }

    const addRoom = () => {
        setRenderRoom({
            id: "",
            status: "create"
        });
        setDialog(true)
    }

    if(data?.status === "view") {
        return(
        <div>
            <h2>Property - {data?.id} </h2>
            <div className="container">
                <h3>Name: {values?.name}</h3>
                <h3>Description: {values?.description}</h3>
                <h3>Type: {values?.type}</h3>
                <h3>Phone: {values?.phone}</h3>
                <h3>Address: {values?.address}</h3>
                <h3>Country: {values?.country}</h3>
                <h3>City: {values?.city}</h3>
                <button onClick={() => {addRoom()}}>Add a Room</button>
            </div>
            <Room
                propertyID={data?.id} 
                dialog={dialog} 
                roomID={renderRoom?.id ?? ""} 
                setDialog={() => {resetDialog()}} 
                status={renderRoom?.status !== "" ? renderRoom?.status : ""}/>
            <div> 
                {rooms.map((room, index) => {
                    return(
                    <div key={index}>
                        <h2>{room.name} - {room.id}</h2>
                        <button onClick={() => {roomCallback(room.id, "view")}}>View</button>
                        <button onClick={() => {roomCallback(room.id, "edit")}}>Edit</button>
                        <button onClick={() => {deleteRoomCallback(room.id)}}>Delete</button>
                    </div>
                    )})}
            </div>
        </div>
    );}

    return (
        <div>
        <Toast message={toast.message} open={toast.open} status={toast.status} />
        <form  className="container">
            <span>
                <label htmlFor="name">Name </label><br/>
                <input 
                    type="text" 
                    value={values?.name} 
                    autoComplete="off" 
                    id="name" 
                    onChange={(e) => {changeValues(e, "name")}} required/>
            </span>
            <span>
                <label htmlFor="description">Description </label><br/>
                <textarea 
                    type="text" 
                    value={values?.description} 
                    id="description"
                    rows="5" 
                    cols="20" 
                    onChange={(e) => {changeValues(e, "description")}} required/>
            </span>
            <span>
                <label htmlFor="phone">Phone Number </label><br/>
                <input 
                    type="tel" 
                    value={values?.phone} 
                    id="phone" 
                    onChange={(e) => {changeValues(e, "phone")}} required/>
            </span>
            <span>
                <label htmlFor="address">Address </label><br/>
                <input 
                    type="text" 
                    value={values?.address} 
                    autoComplete="off" 
                    id="address" 
                    onChange={(e) => {changeValues(e, "address")}} required/>
            </span>
            <span>
                <label htmlFor="country">Country </label><br/>
                <input 
                    type="text" 
                    value={values?.country} 
                    autoComplete="off" 
                    id="country" 
                    onChange={(e) => {changeValues(e, "country")}} required/>
            </span>
            <span>
                <label htmlFor="city">City </label><br/>
                <input 
                    type="text" 
                    value={values?.city} 
                    autoComplete="off" 
                    id="city" 
                    onChange={(e) => {changeValues(e, "city")}} required/>
            </span>
            <span>
                <label htmlFor="type">Type of property </label>
                <select 
                    name="type" 
                    value={values?.type} 
                    id="type" 
                    onChange={(e) => {changeValues(e, "type")}}>
                    <option value="hotel">Hotel</option>
                    <option value="pensiune">Pensiune</option>
                    <option value="vila">Vila</option>
                    <option value="cabana">Cabana</option>
                    <option value="apartament">Apartament</option>
                </select>
            </span><br/>
            <button type="submit" onClick={(e) => {handleSubmit(e)}}>Save</button>
        </form>
        <Room 
            propertyID={data?.id} 
            dialog={dialog} 
            setDialog={() => {setDialog(!dialog)}} 
            status="edit"/>
        </div>
    )
}

export default Property;