import React from 'react';
import ListRow from './ListRow.jsx';

interface ListContainerProps {
    orderTypes: OrderType[]
}

interface OrderType {
    itemName: string;
    flavor: string;
    size: string;
  }

const ListContainer: React.FC<ListContainerProps> = ({orderTypes}) => {
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
                    {orderTypes.map((type: OrderType, index: number) => <ListRow key={index} itemName={type.itemName} flavor={type.flavor} size={type.size} price={type.size === "Regular" ? 1 : 1.5}></ListRow>)}
                </tbody>
            </table>
        </div>
    );
}

export default ListContainer;
