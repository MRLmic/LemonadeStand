import React, { useContext, useEffect, useRef } from 'react';
import { OrderContext } from './Wrapper';

const AlertModal = ({ open, message }) => {
  const { dispatch } = useContext(OrderContext);
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      dispatch({ type: 'CLOSE_MODAL' });
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className={open ? 'message-modal' : 'message-modal-hidden'}>
      <div className="message-modal-content" ref={modalRef}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default AlertModal;
