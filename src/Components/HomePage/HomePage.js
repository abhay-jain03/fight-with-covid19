/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from "react";
import './HomePage.css';
import ModalPopUp from '../Modal/Modal';
import SelectBox from '../SelectBox/SelectBox';
import FooterPage from '../FooterPage/FooterPage';
import { getList } from '../../api/requirements';

const HomePage = (props) => {

    const [getCity, setCity] = useState();
    const [require, setRequire] = useState();
    const [modal, setModal] = useState(false);
    const [store, setStore] = useState("need");
    const [getListing, setListing] = useState([]);

    useEffect(() => {
        getList(getCity, require).subscribe((res) => {
          if (res) {
            setListing(res.data);
          }
        })
    }, [getCity, require]);

    const city = [
        {
            name: "ludhiana",
            id : 1
        },{
            name: "amritsar",
            id : 2
        },{
            name: "patiala",
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
            name: "oxygen",
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
        },{
            name: "Plasma",
            id : 7
        },{
            name: "Money",
            id : 8
        }
    ];

    const currentState = [
      {
          name: 'Punjab'
      }
    ];

    console.log("getCity", getListing);

    return (
        <>
        {modal ? (
          <ModalPopUp
            close={() => setModal(false)}
            setState={store === 'need' ? setRequire : setCity}
            state={store === 'need' ? Needs : city}
            Need={Needs}
            currentState = {currentState}
            currentCity = {city}
            setCurrentState = {setCity}
            text={'Select Your Needs'}
            heading={store === 'supply' ? 'Please Add Resources which you have' : 'Please give your requirements which you have needs'}
            store={store}
          />
        ) : null}
        <div className="components">
            <h2 className="heading">Lets Fight With Covid 19</h2>

            <img src="banner-1.jpg" alt="banner" className="banner" />
            
            <div className="sub-details">
                <div className="description">Let us all come together in this fight against COVID-19</div>

                <div className="sub-details2">
                    <button type="button" onClick={() => { setModal(true); setStore('supply') }}>Add Resource</button>
                    <button type="button" onClick={() => { setModal(true); setStore('need') }}>Leave Your Requirements</button>
                </div>
                
                <div className="sub-details3">
                  <div className="select_city">Please Select Your City</div>
                  <SelectBox setState={setCity} state={city} text={'Select Your City'} />
                </div>
                <div className="sub-details3">
                  <div className="select_city">Please Choose Your Needs</div>
                  <SelectBox setState={setRequire} state={Needs} text={'Select Your Needs'} />
                </div>
            </div>

            <ul className="sub-details4">
                {getListing && getListing.map((list) => (
                  <li className="card-list">
                    <div>{list.name}</div>
                    <div>{list.city}</div>
                    <div>{list.state}</div>
                    <div>{list.number}</div>
                    <div>{list.category}</div>
                    <div>{list.age}</div>
                  </li>
                ))}
            </ul>
        </div>

        <FooterPage />
        </>
    )
}

export default HomePage;