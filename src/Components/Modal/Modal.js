import React, { useState } from "react";
import './Modal.css';
import { addNeeds, addSupply } from '../../api/requirements';
import SelectBox from '../SelectBox/SelectBox';

const Modal = (props) => {
  const { close, setState, state, text, heading, store, currentState, currentCity, setCurrentState, Need } = props;
  const [formInputs, setFormInputs] = useState({
    name: '',
    age: '',
    state: '',
    city: '',
    number: '',
    category: '',
    description: '',
  });

  function handleChange(evt) {
    const array = {};
    array[evt.target.name] = evt.target.value;
    setFormInputs({
      ...formInputs,
      ...array,
    });
  }

  function submitForm() {
    let data1 = {
      name: formInputs.name,
      age: formInputs.age,
      state: formInputs.state,
      city: formInputs.city,
      number: formInputs.number,
      category: formInputs.category,
      description: formInputs.description,
    }
    let data2 = {
      name: formInputs.name,
      state: formInputs.state,
      city: formInputs.city,
      number: formInputs.number,
      category: formInputs.category,
    }
    console.log("data", data1 + data2);
    if (store === 'need') {
      addNeeds(data1).subscribe((res) => {
        if (res.status) {
            console.log('yes');
        }
      });
    }
    if (store === 'supply') {
      addSupply(data2).subscribe((res) => {
        if (res.status) {
            console.log('yes');
        }
      });
    }
  };

  return (
      <>
        <div className="modalComponent" onClick={() => close()}></div>
        <div className="modalSubComponent">
          <div className="modalArea">
            <h2>{heading}</h2>
            <div className="gridArea">
              <input type="text" placeholder="Enter Your Full Name*" name="name" onChange={(e) => handleChange(e)} />
              {store === 'need' ? <input type="number" placeholder="Enter Your Age*" name="age" onChange={(e) => handleChange(e)} /> : null}
            </div>
            <div className="gridArea">
              {/* <input type="text" placeholder="Enter Your State*" name="state" onChange={(e) => handleChange(e)} />
              <input type="text" placeholder="Enter Your City*" name="city" onChange={(e) => handleChange(e)} /> */}
              <SelectBox setState={setCurrentState} state={currentState} text={"Enter your State"} cssClass={"gridAreaBox"} name="state" onChange={handleChange} />
              <SelectBox setState={setCurrentState} state={currentCity} text={"Enter your City Name"} cssClass={"gridAreaBox"} name="city" onChange={handleChange} />
            </div>
            <div className="gridArea">
              <input type="Number" placeholder="Enter Your Phone Name*" name="number" onChange={(e) => handleChange(e)} />
              <SelectBox setState={setState} state={Need} text={"Select Category"} cssClass={"gridAreaBox"} name="category" onChange={handleChange} />
            </div>
            {store === 'need' ? (
              <div className="gridArea">
                <textarea type="text" placeholder="Enter Description" name="description" onChange={(e) => handleChange(e)} />
              </div>
            ) : null}

            <button type="submit" className="submitButton" onClick={() => submitForm()}>Submit</button>
          </div>
        </div>
      </>
  )
}

export default Modal;