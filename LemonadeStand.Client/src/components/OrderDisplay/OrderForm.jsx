import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../components/Wrapper.jsx";

export const OrderForm = ({ open, setOpen, submit, setSubmit, total }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { dispatch } = useContext(OrderContext);

  useEffect(() => {
    if (submit) {
      if (name === "") {
        dispatch({ type: "SET_MESSAGE", payload: "Please enter a name for this order" });
        return;
      } else if (phone === "" && email === "") {
        dispatch({ type: "SET_MESSAGE", payload: "Please enter a phone number or email so we can notify you when your order is ready" });
        return;
      } else {
        let customerInfo;
        if (phone && email) {
          customerInfo = { name: name, phoneNumber: phone, email: email };
        } else if (phone) {
          customerInfo = { name: name, email: "", phoneNumber: phone };
        } else {
          customerInfo = { name: name, email: email, phoneNumber: "" };
        }
        dispatch({ type: "SUBMIT", customerInfo: customerInfo });
      }
    }

    if (!total) {
      closeForm();
    }
  }, [ submit, setSubmit, name, phone, email, setOpen, total, dispatch ]);
  
  const closeForm = () => {
    setOpen(false);
    setSubmit(false);
    setName("");
    setEmail("");
    setPhone("");
  }

  if (open) {
    return (
      <form className="OrderForm">
        <span>
          Please enter your name and your phone number OR email and click submit
          to confirm!
        </span>
        <br></br>
        <label>
          Name:
          <input 
            required
            autoFocus 
            type="text" 
            name="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            />
        </label>
        <br></br>
        <label>
          Phone Number (no more than 10 numbers):
          <input
            type="tel"
            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
            maxLength={10}
            name="phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <br></br>
        <label>
          Email:
          <input 
            type="email" 
            name="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            />
        </label>
      </form>
    );
  } else {
    return "";
  }
};

export default OrderForm;
