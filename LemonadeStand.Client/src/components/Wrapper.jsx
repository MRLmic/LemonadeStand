import React, { useState, useEffect, useReducer, createContext } from "react";
import AlertModal from "./AlertModal";
import ListContainer from "./ItemDisplay/ListContainer";
import TotalBox from "./OrderDisplay/TotalBox";

export const OrderContext = createContext();

const initialState = {
  total: 0,
  message: "",
  open: false,
  customerInfo: "",
  orderSuccess: false,
  order: ""
};

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
      let customer = action.customerInfo;
      return {
        ...state,
        customerInfo: customer,
        order: order,
      };
    case "SET_MESSAGE":
      return { ...state, message: action.payload, open: true, orderSuccess: action.orderSuccess };
    case "CLOSE_MODAL":
      if (state.orderSuccess) {
        return { ...state, open: false, customerInfo: "", orderSuccess: false, total: 0 };
      } else {
        return { ...state, open: false };
      }

    default:
      return state;
  }
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
  const { open, message, total, customerInfo, order } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/Products`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
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

    const postData = async (customerInfo, order) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/Orders`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              customer: customerInfo,
              order: order,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        dispatch({
          type: "SET_MESSAGE",
          payload: `Order submitted successfully! Your order number is ${data.orderId}`, orderSuccess: true
        });
      } catch (error) {
        console.error("Submission error:", error);
        dispatch({
          type: "SET_MESSAGE",
          payload: "Failed to submit the order. Please try again.",
        });
      }
    };

    // does it matter the component doesn't need to be re-rendered? Need to reset customerInfo to "" conditional closemodal
    if (customerInfo !== "" && total !== 0) {
      postData(customerInfo, order);
    }
  }, [customerInfo, order]);

  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      <div>
        <ListContainer products={products}></ListContainer>
        <TotalBox total={total}></TotalBox>
        <AlertModal open={open} message={message}></AlertModal>
      </div>
    </OrderContext.Provider>
  );
};

export default Wrapper;
