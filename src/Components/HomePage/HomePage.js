/* eslint-disable react/style-prop-object */
import React, { useState } from "react";
import './HomePage.css';
import ModalPopUp from '../Modal/Modal';

const HomePage = (props) => {

    const [getCity, setCity] = useState();
    const [require, setRequire] = useState();
    const [modal, setModal] = useState(false);

    const city = [
        {
            name: "Ludhiana",
            id : 1
        },{
            name: "Amritsar",
            id : 2
        },{
            name: "Patiala",
            id : 3
        },{
            name: "Pathankot",
            id : 4
        },{
            name: "Hoshiarpur",
            id : 5
        },{
            name: "Bathinda",
            id : 6
        },{
            name: "Firozpur",
            id : 7
        }
    ];

    const Needs = [
        {
            name: "Oxygen",
            id : 1
        },{
            name: "Beds",
            id : 2
        },{
            name: "Medicines",
            id : 3
        },{
            name: "Pulse Oximeter",
            id : 4
        },{
            name: "Redmisver Medicine",
            id : 5
        },{
            name: "ICU Beds",
            id : 6
        }
    ];



    console.log("getCity", getCity, require);

    return (
        <>
        {modal ? <ModalPopUp close={() => setModal(false)} /> : null}
        <div className="components">
            <h2 className="heading">Lets Fight With Covid 19</h2>

            <img src="banner-1.jpg" alt="banner" className="banner" />
            
            <div className="sub-details">
                <div className="description">Let us all come together in this fight against COVID-19</div>

                <div className="sub-details2">
                    <button type="button" onClick={() => setModal(true)}>Add Resource</button>
                    <button type="button" onClick={() => setModal(true)}>Leave Your Requirements</button>
                </div>
                
                <div className="select_city">Please Select Your City</div>
                <select className="cityName" onChange={(e) => setCity(e.target.value)}>
                    <option> Select Your City </option>
                    {city.map((cities, index) => (
                        <option value={cities.name}> {cities.name} </option>
                    ))}
                </select>

                <div className="select_city">Please Choose Your Needs</div>
                <select className="cityName" onChange={(e) => setRequire(e.target.value)}>
                    <option> Select Your Needs </option>
                    {Needs.map((need, index) => (
                        <option value={need.name}> {need.name} </option>
                    ))}
                </select>
            </div>
        </div>
        </>
    )
}

export default HomePage;