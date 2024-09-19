import React, { useState, useEffect, useReducer, createContext } from 'react';
import ListContainer from './ItemDisplay/ListContainer';
import TotalBox from './OrderDisplay/TotalBox';

export const OrderContext = createContext();

const initialState = {};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_INITIAL_STATE':
            const newState = { ...state, ...action.payload, total: 0 };
            return newState;
        case 'INCREMENT':
            return {
                ...state,
                [action.productId]: (state[action.productId] || 0) + 1,
                total: state.total + action.price
            };
        case 'DECREMENT':
            return {
                ...state,
                [action.productId]: Math.max((state[action.productId] || 0) - 1, 0),
                total: Math.max(state.total - action.price, 0)
            };
        case 'RESET':
            return {
                    ...state,
                    [action.productId]: 0,
                    total: Math.max(state.total - (state[action.productId] * action.price), 0)
                };
        default:
            return state;
    }
};

const Wrapper = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_URL, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setProducts(data);

                const initialStateFromProducts = data.reduce((acc, product) => {
                    acc[product.productId] = 0; 
                    return acc;
                }, {});

                dispatch({ type: 'SET_INITIAL_STATE', payload: initialStateFromProducts });
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, []);

    return (
        <OrderContext.Provider value={{ state, dispatch }}>
            <div>
                <ListContainer products={products}></ListContainer>
                <TotalBox total={total}></TotalBox>
            </div>
        </OrderContext.Provider>
    );
};

export default Wrapper;