import React, { createContext, useContext, useReducer } from "react";

export const StoreContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StoreContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StoreContext.Provider>
);

export const useStateValue = () => useContext(StoreContext);
