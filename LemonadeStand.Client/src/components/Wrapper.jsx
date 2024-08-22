import React, { useState, useEffect } from 'react';
import ListContainer from './ItemDisplay/ListContainer';

const Wrapper = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log('API URL:', process.env.REACT_APP_API_URL);
        const fetchData = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_URL, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <ListContainer products={products}></ListContainer>
        </div>
    );
};

export default Wrapper;