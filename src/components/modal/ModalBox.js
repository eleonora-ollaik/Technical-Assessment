import React from "react";
import './modalbox.css';

 function ModalBox (props) {

  const {content, onClickCloseModal, hide} = props;

  
    return (
      <div className={hide ? "modalhide":"modalshow"}>
        <div className="modal-content">
          <span className="close" onClick={onClickCloseModal}>x</span>
          {content}          
        </div>
      </div>
    );
  
}

export default ModalBox;