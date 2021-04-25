import React from "react";
import './SelectBox.css';

const SelectBox = (props) => {
  const { setState, state, text, cssClass, onChange, name } = props;

  return (
    <>
      <select className={cssClass ? cssClass : "cityName"} name={name} onChange={(e) => { setState(e.target.value); onChange ? onChange(e) : console.log('')}}>
        <option> {text} </option>
        {state.map((cities, index) => (
            <option value={cities.name}> {cities.name} </option>
        ))}
      </select>
    </>
  );
}

export default SelectBox;