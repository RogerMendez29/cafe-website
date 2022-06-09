import React from "react";
import { MdShoppingCart } from "react-icons/md";
import { motion } from "framer-motion";

const RowContainer = ({ flag, data }) => {

  return (
    <div
      className={`w-full my-12 gap-3 flex items-center   ${
        flag ? "overflow-x-scroll"  : "overflow-x-hidden flex-wrap"
      }`}
    >
      {data &&
        data.map((item) => {
          return (
            <div key={item.id} className=" min-w-[250px] md:min-w-[275px]  w-[275px] md:w-300 h-[220px]  my-4 mx-4 bg-gray-50 rounded-lg p-2 hover:drop-shadow-lg">
              <div className="w-full flex items-center justify-between  ">
                <motion.img
                  whileHover={{ scale: 1.2 }}
                  className="w-[11rem] -mt-6 h-[11rem] drop-shadow-2xl"
                  src={item.imageURL}
                />
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md"
                >
                  <MdShoppingCart className="text-white" />
                </motion.div>
              </div>
              <div className="w-full flex flex-col  items-end justify-end">
                <p className="text-gray-500 font-semibold text-base md:text-lg">
                  {item.name}
                </p>
                <div className="flex items-center ">
                  <p className="text-md text-headingColor font-semibold">
                    <span className="text-sm text-red-500">$</span>{item.price}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default RowContainer;
