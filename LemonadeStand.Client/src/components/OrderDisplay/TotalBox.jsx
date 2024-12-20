import React, { useContext, useState } from "react";
import { OrderContext } from "../Wrapper.jsx";
import { formatter } from "../../utils.js";
import OrderForm from "./OrderForm.jsx";

const TotalBox = () => {
  const [open, setOpen] = useState(false);
  const [submit, setSubmit] = useState(false);
  const { state, dispatch } = useContext(OrderContext);
  let orderText = open ? "Submit" : "Order Now";

  const openForm = () => {
    if (state.total) {
      setOpen(true);
    } else {
      dispatch({
        type: "SET_MESSAGE",
        payload:
          "It looks like you haven't ordered anything yet! Please add some items to your order before submitting.",
      });
    }
  };
  const submitForm = () => setSubmit(true);

  return (
    <div className="total-box">
      <div className="total">Total</div>
      <div className="amount">{formatter.format(state.total)}</div>
      <br></br>
      <button onClick={open ? submitForm : openForm} className="order-button">
        {orderText}
      </button>
      <OrderForm
        open={open}
        setOpen={setOpen}
        submit={submit}
        setSubmit={setSubmit}
        total={state.total}
      ></OrderForm>
    </div>
  );
};

export default TotalBox;
