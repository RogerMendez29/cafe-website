import React, { useRef, useState, useEffect } from "react";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";
import { useDispatch, useSelector } from "react-redux";
import ItemModalContainer from "./ItemModalContainer";

const MainContainer = () => {
  const dispatch = useDispatch();
  const foodItems = useSelector((state) => state.items.foodItems);
  const cartShow = useSelector((state) => state.cartUi.cartIsVisible);
  const [scroll, setScroll] = useState(0);
  const [open, setOpen] = useState(false);
  const [itemBeingAdded, setItemBeingAdded] = useState(false);
  useEffect(() => {}, [scroll, cartShow]);
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />
      {open ? <ItemModalContainer open={open} setOpen={setOpen} /> : null}
      <ItemModalContainer
        open={open}
        setOpen={setOpen}
        setItemBeingAdded={setItemBeingAdded}
        itemBeingAdded={itemBeingAdded}
      />
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
          className=" "
          setItemBeingAdded={setItemBeingAdded}
          setOpen={setOpen}
          scrollValue={scroll}
          flag={true}
          data={foodItems?.filter((foodItem) => {
            return foodItem.popular === true;
          })}
        />
      </section>
      <MenuContainer setOpen={setOpen} setItemBeingAdded={setItemBeingAdded} />
      {cartShow && <CartContainer />}
    </div>
  );
};

export default MainContainer;
