import { motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, addItemQty } from "../reducers/cartSlice";
import { FiDelete } from "react-icons/fi";

const ModalContainer = ({ modalItem, setShowModal }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [updatedItem, setUpdatedItem] = useState(modalItem);
  const dispatch = useDispatch();

  const addToCart = (e) => {
    setShowModal(false);

    e.preventDefault();
    if (cartItems.includes(modalItem)) {
      dispatch(addItemQty(modalItem.id));
    } else {
      dispatch(addItem(updatedItem));
      localStorage.setItem("cartItems", JSON.stringify(updatedItem));
    }
  };

  console.log(updatedItem);

  return (
    <div className="fixed top-[12rem]  w-[2px] md:w-[40rem] h-[fit-content] max-h-[75%] bg-gray-100 drop-shadow-md flex flex-col z-[101] justify-between overflow-scroll ">
      <img
        className="w-[20rem] h-[15rem] flex justify-center align-center mx-auto "
        src={modalItem.imageURL}
      />
      <div className="ml-5 ">
        <h1 className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
          {modalItem.name}
        </h1>
        <p className=" ml-7 text-sm  capitalize text-headingColor relative mt-5 ">
          {"Item Description Would go here"}
        </p>
      </div>
      <form onSubmit={addToCart} className="">
        <div className=" mx-2 my-4">
          <select
            className="w-full outline-none text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer "
            onChange={(e) =>
              setUpdatedItem({ ...updatedItem, firstSide: e.target.value })
            }
          >
            <option value="other" className="bg-white">
              Choose Side
            </option>
            <option value="side" className="bg-white">
              side
            </option>
            <option value="side" className="bg-white">
              side
            </option>
          </select>
        </div>
        <div className=" mx-2 my-4">
          <select
            onChange={(e) =>
              setUpdatedItem({ ...updatedItem, secondSide: e.target.value })
            }
            className="w-full outline-none text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer "
          >
            <option value="other" className="bg-white">
              Choose Side
            </option>
            <option value="other" className="bg-white">
              side
            </option>
            <option value="other" className="bg-white">
              side
            </option>
          </select>
        </div>
        <div className=" mx-2 my-4">
          <select
            onChange={(e) =>
              setUpdatedItem({ ...updatedItem, dressing: e.target.value })
            }
            className="w-full outline-none text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer "
          >
            <option value="other" className="bg-white">
              Choose Dressing
            </option>
            <option value="other" className="bg-white">
              Dressing
            </option>
            <option value="other" className="bg-white">
              Dressing
            </option>
          </select>
        </div>
        <div className=" flex h-[fit-content] ">
          <motion.button
            onClick={() => setShowModal(false)}
            whileTap={{ scale: 0.8 }}
            type="button"
            className="  ml-2 h-[fit-content] bottom-0 w-[fit-content] min-w-[4rem] p-2 rounded-full bg-gradient-to-tr from-gray-400 to-gray-600  text-gray-200 text-lg my-2 hover:shadow-lg duration-150 ease-out"
          >
            <FiDelete className="h-[30px] w-full" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.8 }}
            type="submit"
            className=" mx-1 h-[fit-content] bottom-0 w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600  text-gray-200 text-lg my-2 hover:shadow-lg duration-150 ease-out"
          >
            Add To Cart <span className="ml-3">${modalItem.price}</span>
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default ModalContainer;
