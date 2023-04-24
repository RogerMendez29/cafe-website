import React, { useState, useEffect } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { RiRefreshFill } from "react-icons/ri";
import CartItem from "./CartItem";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import EmptyCart from "./Images/General/emptyCart.svg";
import { useDispatch, useSelector } from "react-redux";
import itemsSlice from "../store/items/itemsSlice";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { cartUiActions } from "../store/shopping-cart/cartUiSlice";

const CartContainer = () => {
  const [flag, setFlag] = useState(1);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartShow = useSelector((state) => state.cartUi.cartIsVisible);
  const user = useSelector((state) => state.user.userDetails);
  const subTotal = useSelector((state) => state.cart.subTotal);
  const totalTax = useSelector((state) => state.cart.totalTax);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const showCart = () => {
    dispatch(cartUiActions.toggle(!cartShow));
  };

  // useEffect(() => {
  //   // let totalPrice = cartItems?.reduce(function (accumulator, item) {
  //   //   return accumulator + item.qty * item.price;
  //   // }, 0);
  //   let totalPrice = 9999;
  //   let tax = (totalPrice * 0.07).toFixed(2);
  //   setSubTot(totalPrice);
  //   setTax(tax);
  // }, [subTot, flag]);

  const clearCart = () => {
    dispatch(cartActions.clearCart());
    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className=" fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
    >
      <div className="w-full flex items-center justify-between p-4">
        <motion.div onClick={showCart} whileTap={{ scale: 0.6 }}>
          <MdOutlineKeyboardBackspace className="text-gray-500 text-3xl cursor-pointer " />
        </motion.div>
        <p className="text-gray-700 text--lg font-semibold">Cart</p>
        <motion.p
          onClick={clearCart}
          whileTap={{ scale: 0.6 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base"
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          <div className="w-full h-600 md:h-42 px-2 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {cartItems &&
              cartItems.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    item={item}
                    setFlag={setFlag}
                    flag={flag}
                  />
                );
              })}
          </div>
          <div className=" mx-2 my-2 flex-1 bg-cartTotal rounded-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">
                ${Math.round((subTotal + Number.EPSILON) * 100) / 100}
              </p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sales tax</p>
              <p className="text-gray-400 text-lg">
                $ {Math.round((totalTax + Number.EPSILON) * 100) / 100}
              </p>
            </div>

            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">
                ${Math.round((totalAmount + Number.EPSILON) * 100) / 100}
              </p>
            </div>
            {user ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600  text-gray-200 text-lg my-2 hover:shadow-lg duration-150 ease-out"
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600  text-gray-200 text-lg my-2 hover:shadow-lg duration-150 ease-out"
              >
                Login To Checkout
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
