import React, { useState, useEffect } from "react";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";

import { useSelector } from "react-redux";
import ModalContainer from "./ModalContainer";

const MainContainer = () => {
  const [scroll, setScroll] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState({});

  const { cartShow, foodItems } = useSelector((state) => {
    return {
      cartShow: state.cart.showCart,
      foodItems: state.food.foodItems,
    };
  });

  useEffect(() => {}, [scroll, cartShow]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />
      <section className="w-full p-4 ">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
            Our Most Popular Dishes
          </p>
          <div className="hidden md:flex gap-3 items-center">
            <motion.div
              onClick={() => setScroll(-200)}
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer  hover:shadow-lg flex items-center justify-center"
            >
              <MdChevronLeft className="text-lg text-white" />
            </motion.div>
            <motion.div
              onClick={() => setScroll(+200)}
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
            >
              <MdChevronRight className="text-lg text-white" />
            </motion.div>
          </div>
        </div>
        <RowContainer
          setModalItem={setModalItem}
          setShowModal={setShowModal}
          showModal={showModal}
          className=" "
          scrollValue={scroll}
          flag={true}
          data={foodItems?.filter((foodItem) => foodItem.popular === "true")}
        />
      </section>

      <MenuContainer
        setShowModal={setShowModal}
        showModal={showModal}
        setModalItem={setModalItem}
      />
      {cartShow && <CartContainer />}
      {showModal && (
        <ModalContainer setShowModal={setShowModal} modalItem={modalItem} />
      )}
    </div>
  );
};

export default MainContainer;
