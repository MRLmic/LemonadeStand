import React, { useContext, useState } from "react";
import { OrderContext } from "../Wrapper.jsx";
import { formatter } from "../../utils.js";
import OrderForm from "./OrderForm.jsx";

const TotalBox = () => {
  const [open, setOpen] = useState(false);
  const [submit, setSubmit] = useState(0);
  const { state } = useContext(OrderContext);
  let orderText = open ? "Submit" : "Order Now";

  const openForm = () => {
    if (state.total) {
      setOpen(true);
    } else {
      alert(
        "It looks like you haven't ordered anything yet! Please add some items to your order before submitting."
      );
    }
  };
  const submitForm = () => setSubmit((submit) => submit + 1);

  return (
    <div className="total-box">
      <div className="total">Total</div>
      <div className="amount">{formatter.format(state.total)}</div>
      <br></br>
      <button onClick={open ? submitForm : openForm} className="order-button">
        {orderText}
      </button>
      <OrderForm open={open} setOpen={setOpen} submit={submit}></OrderForm>
    </div>
  );
};

export default TotalBox;
