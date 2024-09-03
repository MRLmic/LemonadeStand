import React from 'react';
import ListRow from './ListRow.jsx';

const ListContainer = (props) => {
    return (
        <div className='List-container'>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th></th>
                        <th className='price-header'>Price</th>
                        <th className='qty-header'>QTY</th>
                        <th className='total-header'>Total</th>
                    </tr>
                    {props.products.map((product, index) => <ListRow key={index} productId={product.productId} flavor={product.flavor} size={product.size} price={product.price}></ListRow>)}
                </tbody>
            </table>
        </div>
    );
}

export default ListContainer;
