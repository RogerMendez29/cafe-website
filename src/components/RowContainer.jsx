import React, { useRef, useEffect, useState } from "react";
import { MdShoppingCart } from "react-icons/md";
import { motion } from "framer-motion";
import notFound from "./Images/General/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();
  const [items, setItems] = useState([]);
  const [{ cartItems }, dispatch] = useStateValue();
  let ShowModal = false;

  useEffect(() => {
    rowContainer.current.scrollLeft = scrollValue;
  }, [scrollValue]);

  useEffect(() => {
    addToCart();
  }, [items]);

  const addToCart = (item) => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  return (
    <div
      ref={rowContainer}
      className={`w-full my-12 gap-3 flex items-center scroll-smooth ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap"
      }`}
    >
      {data?.length > 0 ? (
        data.map((item) => {
          return (
            <div
              key={item.id}
              className=" min-w-[250px] md:min-w-[275px]  w-[275px] md:w-300 h-[220px]  my-4 mx-4 bg-gray-50 rounded-lg p-2 hover:drop-shadow-lg flex flex-col justify-between"
            >
              <div className="w-full flex justify-between   ">
                <motion.img
                  whileHover={{ scale: 1.2 }}
                  className="w-[11rem] -mt-6 h-[11rem] drop-shadow-2xl"
                  src={item.imageURL}
                />
                <motion.div
                  onClick={() => setItems([...cartItems, item])}
                  whileTap={{ scale: 0.75 }}
                  className="m-2 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md"
                >
                  <MdShoppingCart
                    onClick={() => (ShowModal = true)}
                    className="text-white"
                  />
                </motion.div>
              </div>
              <div className="w-full flex flex-col  items-end justify-end">
                <p className="text-gray-500 font-semibold text-base md:text-lg">
                  {item.name}
                </p>
                <div className="flex items-center ">
                  <p className="text-md text-headingColor font-semibold">
                    <span className="text-sm text-red-500">$</span>
                    {item.price}
                  </p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={notFound} className="h-340" />
          <p className="my-2 font-semibold text-xl">Items Not Available</p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
