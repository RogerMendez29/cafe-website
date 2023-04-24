import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";

import { cartActions } from "../store/shopping-cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const CartItem = ({ item, setFlag, flag }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [qty, setQty] = useState(item.qty);
  let items = cartItems;
  const updateQty = (action, id) => {
    let item = cartItems.filter((item) => item.id === id);
    if (action === "add") {
      console.log(item[0]);
      dispatch(cartActions.addItem(item[0]));
      setQty(item[0].qty);
    } else {
      dispatch(cartActions.removeItem(id));
    }
  };

  useEffect(() => {
    let specificItem = cartItems.find((cartItem) => cartItem.id === item.id);
    setQty(specificItem.qty);
  }, [cartItems]);

  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
      <img
        src={item.imageURL}
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
        alt=""
      />

      {/* name section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item.name}</p>
        <p className="text-sm block text-gray-300 font-semibold">
          <span className="text-xs">$</span>
          {Math.round((item.price * qty + Number.EPSILON) * 100) / 100}
        </p>
      </div>

      {/* button section */}
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          onClick={() => updateQty("remove", item?.id)}
          whileTap={{ scale: 0.75 }}
        >
          <BiMinus className="text-gray-50 " />
        </motion.div>

        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {qty}
        </p>

        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("add", item?.id)}
        >
          <BiPlus className="text-gray-50 " />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
