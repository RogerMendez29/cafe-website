import React, { useEffect } from "react";
import { Header } from "./components/Header";
import CreateContainer from "./components/CreateContainer";
import MainContainer from "./components/MainContainer";
import AboutContainer from "./components/AboutContainer";

import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";

export const App = () => {
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = () => {
    getAllFoodItems().then((data) => {
      // console.log(data);
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col">
        <Header />
        <main className="mt-16 md:mt-24 px-4 md:px-16  py-4 w-full">
          <Routes>
            <Route path="/" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/about" element={<AboutContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
