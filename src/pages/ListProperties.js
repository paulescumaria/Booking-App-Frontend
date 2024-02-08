import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../App";
import { deleteData, getData, paramsURL } from "../utils/fetch";
import "../assets/Property.css";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

const ListProperties = () => {
    const { user } = useContext(UserContext);
    const [properties, setProperties] = useState([]);
    const navigate = useNavigate();
    const [toast, setToast] = useState({
        message: "",
        open: false,
        status: ""
    });

    const [count, setCount] = useState(0);

    useEffect(() => {
        if (user?.id) {
            getData("viewproperties" + paramsURL([user?.id])).then((res) => {
                return res.json();
            }).then((data) => {
                setProperties(data)
            })
            .catch(err => {
                console.log(err);
            })
        }
    }, [user?.id, count])

    const viewPropertyCallback = (propertyID) => {
        navigate(`/property/view?id=${encodeURIComponent(propertyID)}`, {state: {id: propertyID, status: "view"}})
    }

    const deletePropertyCallback = (propertyID) => {
        deleteData("removeproperty" + paramsURL([propertyID])).then((res) => {
            if(res.ok) {
                setToast({
                    message: "Property was deleted successfully!",
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

    const editPropertyCallback = (propertyID) => {
        navigate(`/property/edit`, {state: {id: propertyID, status: "edit"}})
    }
  
    return(
        <div className="propertyContainer">
            <Toast message={toast.message} open={toast.open} status={toast.status} />
            {properties.map((property, index) => {
                   return(
                    <div key={index} className="details">
                        <h2>{property.name} - {property.id}</h2>
                        <h4>{property.type}</h4>
                        <h4>{property.city}, {property.country}</h4>
                        <button onClick={() => viewPropertyCallback(property.id)}>View</button>
                        <button onClick={() => {deletePropertyCallback(property.id)}}>Delete</button>
                        <button onClick={() => {editPropertyCallback(property.id)}}>Edit</button>
                    </div>
                   ) 
            })}
        </div>
    )
}

export default ListProperties;