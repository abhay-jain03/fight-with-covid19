import React, { useState } from "react";
import './Modal.css';

const Modal = (props) => {
  const { close } = props;
  return (
      <>
        <div className="modalComponent" onClick={() => close()}></div>
        <div className="modalSubComponent">
          <div className="modalArea">
            <h2>Fill the form</h2>
            <div className="gridArea">
              <input type="text" placeholder="Enter Your First Name*" />
              <input type="text" placeholder="Enter Your Last Name*" />
            </div>
            <div className="gridArea">
              <input type="Number" placeholder="Enter Your Phone Name*" />
              <input type="Number" placeholder="Enter Your Age*" />
            </div>
            <div className="gridArea">
              <textarea type="text" placeholder="Enter Description" />
            </div>

            <button type="submit">Submit</button>
          </div>
        </div>
      </>
  )
}

export default Modal;