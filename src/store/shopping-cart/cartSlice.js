import { createSlice } from "@reduxjs/toolkit";

const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const totalQuantity =
  localStorage.getItem("totalQuantity") !== null
    ? JSON.parse(localStorage.getItem("totalQuantity"))
    : 0;

const subTotal =
  localStorage.getItem("subTotal") !== null
    ? JSON.parse(localStorage.getItem("subTotal"))
    : 0;

const totalTax =
  localStorage.getItem("totalTax") !== null
    ? JSON.parse(localStorage.getItem("totalTax"))
    : 0;

const totalAmount =
  localStorage.getItem("totalAmount") !== null
    ? JSON.parse(localStorage.getItem("totalAmount"))
    : 0;

const setItemFunc = (item, totalAmount, totalQuantity, subTotal, totalTax) => {
  localStorage.setItem("cartItems", JSON.stringify(item));
  localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
  localStorage.setItem("subTotal", JSON.stringify(subTotal));
  localStorage.setItem("totalTax", JSON.stringify(totalTax));
  localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
};

const initialState = {
  cartItems: items,
  totalQuantity: totalQuantity,
  subTotal: subTotal,
  totalTax: totalTax,
  totalAmount: totalAmount,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    // =========== add item ============
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      state.totalQuantity++;

      if (!existingItem) {
        // ===== note: if you use just redux you should not mute state array instead of clone the state array, but if you use redux toolkit that will not a problem because redux toolkit clone the array behind the scene
        state.cartItems.push(newItem);
      } else {
        existingItem.qty++;
      }

      state.subTotal = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.qty),
        0
      );
      state.totalTax = Number(state.subTotal) * Number(0.07);

      state.totalAmount = Number(state.subTotal) + Number(state.totalTax);

      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity,
        state.subTotal,
        state.totalTax
      );
    },

    // ========= remove item ========

    removeItem(state, action) {
      const id = action.payload;

      const existingItem = state.cartItems.find((item) => item.id === id);
      state.totalQuantity--;

      if (existingItem.qty === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      } else {
        existingItem.qty--;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) - Number(existingItem.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.qty),
        0
      );

      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity,
        state.subTotal,
        state.totalTax
      );
    },

    //============ delete item ===========

    deleteItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },

    clearCart(state) {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      state.subTotal = 0;
      state.totalTax = 0;
      localStorage.setItem("cartItems", []);
      localStorage.setItem("totalAmount", 0);
      localStorage.setItem("subTotal", 0);
      localStorage.setItem("totalTax", 0);
      localStorage.setItem("totalQuantity", 0);
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
