import React, { useContext } from 'react';
import Lemon from '../../assets/img/lemon.png';
import Trash from '../../assets/img/trash-icon.svg';
//ToDo create aliases for assets
import QuantityComponent from './QuantityComponent.jsx';
import { OrderContext } from './../Wrapper.jsx';
import { formatter } from '../../utils.js'

const ListRow = ({price, flavor, size, productId }) => {
    const { dispatch } = useContext(OrderContext);

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
            <QuantityComponent price={price} productId={productId}></QuantityComponent>
        </td>
        <td className='total-text'>
            {formatter.format(price)}
        </td>
        <td className='trash'>
            <button onClick={() => dispatch({ type: 'RESET', productId })} className='trash-button'>
                <img src={Trash} alt='trash'></img>
            </button>
        </td>
    </tr>)
};

export default ListRow;