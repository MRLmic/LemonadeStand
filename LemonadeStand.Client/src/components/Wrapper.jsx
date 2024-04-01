import React, { createContext, useReducer, useEffect } from 'react';
import ListContainer from './ItemDisplay/ListContainer.jsx'
import TotalBox from './OrderDisplay/TotalBox.jsx'

export const TotalContext = createContext<TotalContextType>({ state: initialState, dispatch: () => {}});

const Wrapper = () => {

    useEffect(() => {
        //TODO - add hosting URL for data fetch
        const url = "";

    const initialState = {
        orderName: '',
        orderEmail: '',
        orderPhone: '',
        total: 0,
        order: { 'LEMREG': 0, 'LEMLARGE': 0, 'PINKLARGE': 0, 'PINKREG': 0 },
        types: []
    };

    const fetchData = async () => {
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            console.log(json);
            dispatch({type: OrderActionKind.UPDATE, types: json});
        } catch (error) {
            console.log("error", error);
        }
    };
    fetchData();
}, []);

return (<TotalContext.Provider value={{ state, dispatch }}>
    <div>
        <ListContainer orderTypes={state.types}></ListContainer>
        <TotalBox></TotalBox>
    </div>
</TotalContext.Provider>
);
};

export default Wrapper;