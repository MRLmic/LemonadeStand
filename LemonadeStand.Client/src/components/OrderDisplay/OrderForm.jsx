import React, {useContext, useEffect, useRef} from 'react';
import { OrderContext } from '../../components/Wrapper.jsx';

export const OrderForm = ({open,setOpen,submit}) => {
    const phoneNumRef = useRef(null);
    const emailRef = useRef(null);
    const nameRef = useRef(null);
    const {dispatch} = useContext(OrderContext);

  useEffect(() => {
    if (submit) {
        if (phoneNumRef.current?.value === '' && emailRef.current?.value === '') {
            alert('An email or phone number is required to place an order.')
            return;
        } else {
            let customerContact;
            let contactType;
            if (emailRef.current?.value === '') {
                customerContact = phoneNumRef.current?.value
                contactType = 'phone'
            } else {
                customerContact = emailRef.current?.value
                contactType = 'email'
            }
            dispatch({type: 'SUBMIT', orderName: nameRef.current?.value, customerContact, contactType})
            setOpen(false)
        }
    }
}, [submit, dispatch, setOpen])

    if (open) { 
        
    return (<form className="OrderForm">
                <span>Please enter your name and your phone number OR email and click submit to confirm!</span><br></br>
                <label>
                Name:
                <input required autoFocus type="text" name="name" ref={nameRef}/>
                </label><br></br>
                <label>
                Phone Number (no more than 10 numbers):
                <input type="tel" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" maxLength={10} name="phone number" ref={phoneNumRef}/>
                </label><br></br>
                <label>
                Email:
                <input type="email" name="email" ref={emailRef} />
                </label>
           </form>) 
    } else {return ""};   
}

export default OrderForm;
