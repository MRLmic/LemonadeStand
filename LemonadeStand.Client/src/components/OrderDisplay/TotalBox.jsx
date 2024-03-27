import React, { useState } from 'react';
import { TotalContext } from '../Wrapper.js';
import {formatter} from '../../utils.js';
import OrderForm from './OrderForm.js'

const TotalBox = () => {
    const [open, setOpen] = useState(false);
    const [submit, setSubmit] = useState(0);
    let orderText = open ? 'Submit' : 'Order Now';

    const openForm = () => setOpen(true);
    const submitForm = () => setSubmit((submit) => submit + 1);   

    return (<div className='total-box'>
                <div className='total'>Total</div>
                    <TotalContext.Consumer>
                        {state => <div className='amount'>
                            {formatter.format(state.state.total)}
                        </div>}
                    </TotalContext.Consumer>
                <br></br>
                <button onClick={open ? submitForm : openForm} className='order-button'>{orderText}</button>
                <OrderForm open={open} setOpen={setOpen} submit={submit}></OrderForm>
            </div>);
};

export default TotalBox;
