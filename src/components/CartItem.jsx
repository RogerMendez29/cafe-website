import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";

import { useSelector, useDispatch } from "react-redux";
import {
  addItemQty,
  setCartItems,
  subtractItemQty,
} from "../reducers/cartSlice";

let items = [];

const CartItem = ({ item, setFlag, flag }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    items = cartItems;
  }, [item?.qty, items]);

  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
      <img
        src={item?.imageURL}
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
        alt=""
      />

      {/* name section */}
      <div className="flex flex-col gap-1">
        <p className="text-base text-gray-50">{item?.name}</p>

        {item.firstSide && item.secondSide ? (
          <div>
            <p className="text-sm text-gray-50">1st Side: {item?.firstSide}</p>
            <p className="text-sm text-gray-50">2nd Side: {item?.secondSide}</p>
          </div>
        ) : null}
      </div>

      {/* button section */}
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          onClick={() => {
            setFlag(flag + 1);
            dispatch(subtractItemQty(item.id));
          }}
          whileTap={{ scale: 0.75 }}
        >
          <BiMinus className="text-gray-50 " />
        </motion.div>

        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {item?.qty}
        </p>

        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => {
            setFlag(flag + 1);
            dispatch(addItemQty(item.id));
          }}
        >
          <BiPlus className="text-gray-50 " />
        </motion.div>
      </div>
      <div className="block">
        <p className="text-sm  text-gray-300 font-semibold  justify-end">
          <span className="text-xs">$</span>
          {item?.price * item?.qty}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
