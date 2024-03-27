import React, { useContext } from 'react'
import { TotalContext, TotalContextType, OrderActionKind } from '../Wrapper.jsx'

const QuantityComponent = ({ itemName, price }) => {
    const { state, dispatch } = useContext<TotalContextType>(TotalContext);
    let quantity = state.order[itemName];
    return (
        <div>
            <button onClick={() => dispatch({ type: OrderActionKind.MINUS, itemName: itemName, price: price })}>-</button>
            <span className='quantity-text'>{quantity}</span>
            <button onClick={() => dispatch({ type: OrderActionKind.PLUS, itemName: itemName, price: price })}>+</button>
        </div>
    )
}

export default QuantityComponent;
