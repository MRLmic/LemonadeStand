import React, {useContext} from 'react';

const AlertModal = ({open, setOpen, message}) => {
  return (
    <div className={open ? "message-modal" : "message-modal-hidden"}>
      <div className="message-modal-content">
        <span>{message}</span>
        <button onClick={() => setOpen(false)}>Close</button>
      </div>
    </div>
  );
}

export default AlertModal;
