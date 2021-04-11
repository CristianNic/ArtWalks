import React from "react";
import Popup from "reactjs-popup";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import closeIcon from "../../assets/icons/close-24px.svg";

import img5 from '../../data_temp/images/Pollard.jpg';

export default (props) => (
  
  <Popup trigger={<img src={img5} className="modal" />} modal nested>

    {(close) => (
      <div className="modal">
        <div className="modal__text">
          <button className="modal__close" onClick={close}>
            <img src={closeIcon} alt="" />
          </button>
          <h2 className="modal__title">
            {" "}
            Delete {props.itemName} inventory item?
          </h2>
          <p className="modal__content">
            Please confirm that you'd like to delete {props.itemName} from the
            inventory list. You won't be able to undo this action.
          </p>
        </div>
        <div className="modal__actions">
          <button
            className="btn btn__cancel"
            onClick={() => {
              console.log("modal closed ");
              close();
            }}
          >
            Close
          </button>
          <button
            className="btn btn__delete"
            onClick={() => {
              close();
              props.axiosdelete(props.itemId);
              // console.log(props);
            }}
          >
            Add to Favourites
          </button>
        </div>
      </div>
    )}
  </Popup>


);


