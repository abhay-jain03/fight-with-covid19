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
    const [currentStates, setCurrentState] = useState();
    const [getListing, setListing] = useState([]);
    const [noData, setNoData] = useState(false);

    function submit() {
        getList(getCity, require).subscribe((res) => {
          if (res) {
            if (res.data && res.data.length === 0) {
                return setNoData(true);
            }
            setListing(res.data);
            setNoData(false);
          };
        });
    }

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
                  <div className="select_city">Please Select Your State</div>
                  <SelectBox setState={setCurrentState} state={currentState} text={'Select Your State'} />
                </div>
                <div className="sub-details3">
                  <div className="select_city">Please Select Your City</div>
                  <SelectBox setState={setCity} state={city} text={'Select Your City'} />
                </div>
                <div className="sub-details3">
                  <div className="select_city">Please Choose Your Needs</div>
                  <SelectBox setState={setRequire} state={Needs} text={'Select Your Needs'} />
                </div>

                <button type="submit" className="submit-HP" onClick={() => submit()}>Submit</button>
            </div>

            <ul className="sub-details4">
                {getListing && getListing.map((list) => (
                  <li className="card-list">
                    <div>
                        <img src="name.png" alt="img" />
                        {list.name}</div>
                    <div> <img src="state.png" alt="img" />{list.state}</div>
                    <div> <img src="city1.png" alt="img" /> {list.city}</div>
                    <div> <img src="phone.png" alt="img" />{list.number}</div>
                    <div> <img src="category.png" alt="img" />{list.category}</div>
                    <div> <img src="age.png" alt="img" />{list.age}</div>
                    <div> <img src="verify.png" alt="img" />{list.last}</div>
                  </li>
                ))}
            </ul>
            {noData ? <p className="lastHeading">Sorry to inform you, No results found. Please leave your requirement, we will let you know as soon as we get a match. </p> : null}
        </div>

        <FooterPage />
        </>
    )
}

export default HomePage;