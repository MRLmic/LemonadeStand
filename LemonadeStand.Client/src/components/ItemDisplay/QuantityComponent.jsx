import React, { useContext } from 'react'
import { OrderContext } from '../Wrapper.jsx'

const QuantityComponent = ({ productId, price }) => {
    const { state, dispatch } = useContext(OrderContext);
    const quantity = state[productId] || 0;

    const increment = () => dispatch({ type: 'INCREMENT', productId, price });
    const decrement = () => dispatch({ type: 'DECREMENT', productId, price });

    return (
            <div>
                <button onClick={decrement}>-</button>
                <span className='quantity-text'>{quantity}</span>
                <button onClick={increment}>+</button>
            </div>
    )
}

export default QuantityComponent;
