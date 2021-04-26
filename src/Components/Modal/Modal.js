import React, { useState } from "react";
import './Modal.css';
import { addNeeds, addSupply } from '../../api/requirements';
import SelectBox from '../SelectBox/SelectBox';
import PhoneInput from 'react-phone-number-input/input'
import {isValidPhoneNumber, isPossiblePhoneNumber} from 'react-phone-number-input'

const Modal = (props) => {
  const { close, setState, state, text, ReactGA, toast, heading, store, currentState, currentCity, setCurrentState, Need } = props;
  const [formInputs, setFormInputs] = useState({
    name: '',
    age: '',
    state: '',
    city: '',
    number: '',
    category: '',
    description: '',
  });
  const [isValid, setisValid] = useState(false)

  function setNumber(number){
    let a={
      number
    }
    console.log(number)
    if(number  && isValidPhoneNumber(number) && isPossiblePhoneNumber(number) && (number.charAt(3)=='9' || number.charAt(3)=='8' || number.charAt(3)=='7' || number.charAt(3)=='6' )){
      setisValid(true)
    }
    else{
      setisValid(false)
    }
    setFormInputs({
      ...formInputs,
      ...a,
    });
  }

  function handleChange(evt) {
    console.log(evt)
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
      ReactGA.event({
        category: 'added need',
        action: 'click on add need',
        value: data1
    });
      addNeeds(data1).subscribe((res) => {
        console.log(res)
        if (res.data) {

          console.log('yes');
          toast("added successfully...")
          close()

        }
        else {
          toast( res.response? res.response.error : "error")
        }
      });
    }
    if (store === 'supply') {
      ReactGA.event({
        category: 'added supply',
        action: 'click on supply add',
        value: data2
    });
      addSupply(data2).subscribe((res) => {
        console.log(res)
        if (res.data) {

          console.log('yes');
          toast("added successfully...")
          close()

        }
        else {
          toast( res.response? res.response.error : "error")
        }

      });
    }
  };

  return (
    <>
      <div className="modalComponent" onClick={() => close()} ></div>
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
            <SelectBox setState={setCurrentState} isArray={true} state={currentState} text={"State"} cssClass={"gridAreaBox"} name="state" onChange={handleChange} />
            <SelectBox setState={setCurrentState} isArray={true} state={currentCity(formInputs.state)} text={"City"} cssClass={"gridAreaBox"} name="city" onChange={handleChange} />
          </div>
          <div className="gridArea">
            <PhoneInput
              country="IN"
              placeholder="Enter phone number"
              value={formInputs.number}
              name = "number"
              onChange={(e) => setNumber(e)} />
            {/* <input type="Number" placeholder="Enter Your Phone Name*" name="number" onChange={(e) => handleChange(e)} /> */}
            <SelectBox setState={setState} state={Need} text={"Category"} cssClass={"gridAreaBox"} name="category" onChange={handleChange} />
          </div>
          {store === 'need' ? (
            <div className="gridArea">
              <textarea type="text" placeholder="Enter Description" name="description" onChange={(e) => handleChange(e)} />
            </div>
          ) : null}
          <div style={{ textAlign: 'center' }}>
            <button style={{ background: "grey" }} className="submitButton" onClick={() => close()}>Close</button>
            <button disabled={!isValid} type="submit" style={{background: !isValid?"grey":"red"}} className="submitButton" onClick={() => submitForm()}>Submit</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal;