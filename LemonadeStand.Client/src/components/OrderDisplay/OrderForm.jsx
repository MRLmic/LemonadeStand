import React, {useContext, useEffect, useRef} from 'react';
import {TotalContext, TotalContextType, OrderActionKind, Submit} from '../Wrapper.js'

interface OrderFormProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    submit: number
}

const OrderForm = ({open,setOpen,submit}) => {
    const phoneNumRef = useRef<HTMLInputElement| null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const nameRef = useRef<HTMLInputElement | null>(null);
    const {dispatch} = useContext<TotalContextType>(TotalContext);

  useEffect(() => {
    if (submit) {
        if (phoneNumRef.current?.value === '' && emailRef.current?.value === '') {
            alert('An email or phone number is required to place an order.')
            return;
        } else {
            let customerContact: string | undefined
            let contactType: string | undefined
            if (emailRef.current?.value === '') {
                customerContact = phoneNumRef.current?.value
                contactType = 'phone'
            } else {
                customerContact = emailRef.current?.value
                contactType = 'email'
            }
            dispatch({type: OrderActionKind.SUBMIT, orderName: nameRef.current?.value, customerContact: customerContact, contactType: contactType})
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
