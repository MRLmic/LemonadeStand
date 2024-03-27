import React, { useContext } from 'react';
import Lemon from '~images/lemon.png';
import Trash from '~images/trash-icon.svg';
import QuantityComponent from './QuantityComponent.jsx';
import { TotalContext, TotalContextType } from '../Wrapper.js';
import { formatter } from '../../utils.js'

const ListRow = ({price, flavor, size, itemName}) => {
    const { state, dispatch } = useContext<TotalContextType>(TotalContext);
    let quantity = state.order[itemName] * price;

    return (<tr className='List-row'>
        <td className='lemon-cell'>
            <span>
                <img className='lemon-img' src={Lemon} alt='lemon'></img>
            </span>
        </td>
        <td className='flavor'>
            <span>
                {flavor}
            </span>
            <span className='size-text'>
                <br></br>
                {size}
            </span>
        </td>
        <td>
            {price}{price === 1 ? '.00' : '0'}
        </td>
        <td className='quantity-text'>
            <QuantityComponent price={price} itemName={itemName}></QuantityComponent>
        </td>
        <td className='total-text'>
            {formatter.format(quantity)}
        </td>
        <td className='trash'>
            <button onClick={() => dispatch({ type: OrderActionKind.CLEAR, itemName: itemName, price: price })} className='trash-button'>
                <img src={Trash} alt='trash'></img>
            </button>
        </td>
    </tr>)
};

export default ListRow;