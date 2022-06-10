import React, { useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../utils/staticData";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";

const MenuContainer = () => {
  const [filter, setFilter] = useState("Entree");


  const [{ foodItems }, dispatch] = useStateValue();

  return (
    <section className="w-full my-6" id="menu">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
          Menu
        </p>

        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categories &&
            categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={category.id}
                className={`group ${
                  filter === category.name ? "bg-red-500" : "bg-gray-100"
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-red-500 `}
                onClick={() => {
                  setFilter(category.name);
                  console.log(category.name)
                }}
              >
                <div
                  className={`w-10 h-10 rounded-full shadow-lg ${
                    filter === category.name
                      ? "bg-white"
                      : ""
                  } group-hover:bg-white  flex items-center justify-center`}
                >
                  <IoFastFood
                    className={`${
                      filter === category.name
                        ? "text-black"
                        : "text-black"
                    } group-hover:text-black text-lg`}
                  />
                </div>
                <p
                  className={`text-sm ${
                    filter === category.name
                      ? "text-gray-800 font-bold"
                      : "text-gray-500"
                  } group-hover:text-gray-800 font-bold`}
                >
                  {category.name === "Sandwich"? `${category.name}es`:`${category.name}s`}
                </p>
              </motion.div>
            ))}
        </div>

        <div id="menu" className="w-full">
          <RowContainer
            flag={false}
            data={foodItems?.filter((item) => item.category === filter)}
          />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
