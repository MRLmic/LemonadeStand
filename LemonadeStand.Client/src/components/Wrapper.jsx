import React, { useState, useEffect, useReducer, createContext } from "react";
import ListContainer from "./ItemDisplay/ListContainer";
import TotalBox from "./OrderDisplay/TotalBox";

export const OrderContext = createContext();

const initialState = {};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_INITIAL_STATE":
      const newState = { ...state, ...action.payload, total: 0 };
      return newState;
    case "INCREMENT":
      return {
        ...state,
        [action.productId]: (state[action.productId] || 0) + 1,
        total: state.total + action.price,
      };
    case "DECREMENT":
      return {
        ...state,
        [action.productId]: Math.max((state[action.productId] || 0) - 1, 0),
        total: Math.max(state.total - action.price, 0),
      };
    case "RESET":
      return {
        ...state,
        [action.productId]: 0,
        total: Math.max(
          state.total - state[action.productId] * action.price,
          0
        ),
      };
    case "SUBMIT":
      const orderItems = mapStateToOrderItems(state);
      let order = { total: state.total, orderItems: orderItems };
      postData(action.customerInfo, order);
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

const postData = (customerInfo, order) => {
  fetch(`${process.env.REACT_APP_API_URL}/api/Orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customer: customerInfo,
      order: order,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const orderId = data.orderId;
      alert(`Thank you! Your Order ID is ${orderId}`);
    })
    .catch((err) => console.log(err));
};

const mapStateToOrderItems = (state) => {
  return Object.entries(state)
    .filter(([key, value]) => !isNaN(key) && value > 0) // Filter out non-numerical keys
    .map(([productId, quantity]) => ({
      productId: Number(productId),
      quantity: quantity,
    }));
};

const Wrapper = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/Products`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setProducts(data);

        const initialStateFromProducts = data.reduce((acc, product) => {
          acc[product.productId] = 0;
          return acc;
        }, {});

        dispatch({
          type: "SET_INITIAL_STATE",
          payload: initialStateFromProducts,
        });
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
