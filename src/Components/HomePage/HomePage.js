/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from "react";
import './HomePage.css';
import ModalPopUp from '../Modal/Modal';
import SelectBox from '../SelectBox/SelectBox';
import FooterPage from '../FooterPage/FooterPage';
import { getList, getHelp } from '../../api/requirements';
import moment from 'moment';
import { allStates, citiesForState } from 'indian-states-cities'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-99765968-1');
const HomePage = (props) => {

    useEffect(() => {
    ReactGA.event({
        category: 'Landing',
        action: 'User landed on page'
      });
    },[])
    const [getCity, setCity] = useState();
    const [require, setRequire] = useState();
    const [modal, setModal] = useState(false);
    const [store, setStore] = useState("need");
    const [currentState, setCurrentState] = useState([]);
    const [getListing, setListing] = useState([]);
    const [noData, setNoData] = useState(false)
    const [city, setCities] = useState([]);


    useEffect(() => {
        // Update the document title using the browser API
        console.log(citiesForState(currentState), currentState)
        setCities(citiesForState(currentState))
    }, [currentState]);

    
    function submit() {
        ReactGA.event({
            category: 'get help',
            action: 'click on search button',
            value: {
                getCity,
                require
            }
        });
        getList(getCity, require).subscribe((res) => {
            if (res) {
                if (res.data && res.data.length === 0) {
                    setListing([]);
                    return setNoData(true);
                }
                setListing(res.data);
                setNoData(false);
            };
        });
    }

    function help() {
         
        ReactGA.event({
            category: 'give Help',
            action: 'click on help button',
            value: {
                getCity,
                require
            }
        });
  
        getHelp(getCity, require).subscribe((res) => {
            if (res) {
                if (res.data && res.data.length === 0) {
                    setListing([]);
                    return setNoData(true);
                }
                setListing(res.data);
                setNoData(false);
            };
        });
    }

    function setState(e){
        setCity(null)
        setCurrentState(e)
    }
    const Needs = [
        {
            name: "oxygen",
            id: 1
        }, {
            name: "Beds",
            id: 2
        }, {
            name: "Medicines",
            id: 3
        }, {
            name: "Pulse Oximeter",
            id: 4
        }, {
            name: "Redmisver Medicine",
            id: 5
        }, {
            name: "ICU Beds",
            id: 6
        }, {
            name: "Plasma",
            id: 7
        }, {
            name: "Money",
            id: 8
        },
        {
            name: "Tiffin",
            id: 9
        }
    ];

    const state = allStates()
    console.log(currentState)
    console.log("getCity", getListing);

    return (
        <>
<ToastContainer/>

            {modal ? (
                <ModalPopUp
                    close={() => setModal(false)}
                    setState={store === 'need' ? setRequire : setCity}
                    state={store === 'need' ? Needs : city}
                    Need={Needs}
                    currentState={state}
                    currentCity={citiesForState}
                    setCurrentState={setCity}
                    text={'Select Your Needs'}
                    heading={store === 'supply' ? 'Please Add Resources which you have' : 'Please give your requirements which you need'}
                    store={store}
                    toast={toast}
                    ReactGA={ReactGA}
                />
            ) : null}
            <div className="components">
                <img src="banner-1.jpg" alt="banner" className="banner" />

                <div className="sub-details">
                    <div className="description">Let us all come together in this fight against COVID-19</div>

                    <div className="sub-details2">
                        <button type="button" onClick={() => { setModal(true); setStore('supply') }}>Add Resource</button>
                        <button type="button" onClick={() => { setModal(true); setStore('need') }}>Leave Your Requirements</button>
                    </div>
                    <div className="list-container">
                        <div className="sub-details3">
                            {/* <div className="select_city">Please Select Your State</div> */}
                            <SelectBox setState={setState} isArray={true} state={state} text={'Select Your State'} />
                        </div>
                        <div className="sub-details3">
                            {/* <div className="select_city">Please Select Your City</div> */}
                            <SelectBox setState={setCity} isArray={true} state={city} text={'Select Your City'} />
                        </div>
                        <div className="sub-details3">
                            {/* <div className="select_city">Please Choose Your Needs</div> */}
                            <SelectBox setState={setRequire} state={Needs} text={'Select Your Needs'} />
                        </div>

                    </div>
                    <div>
                    <button type="submit" className="submit-HP" onClick={() => help()}>Help Someone</button>
                    <button type="submit" className="submit-HP" onClick={() => submit()}>Search Resources</button>
                    </div>
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
                            {list.age?
                            <div> <img src="age.png" alt="img" />{list.age}</div>:null}
                            <div> <img src="verify.png" alt="img" />
                                {moment(list.last).add('350, minutes').format('YYYY-MMM-DD h:mm A')}
                            </div>
                            <div>
                            {list.description?
                            <p> {list.description}</p>:null}
                            </div>
                            
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