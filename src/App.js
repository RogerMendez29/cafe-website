import React, { useEffect } from "react";
import { Header } from "./components/Header";
import CreateContainer from "./components/CreateContainer";
import MainContainer from "./components/MainContainer";
import AboutContainer from "./components/AboutContainer";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { userActions } from "./store/user/userSlice";
import { itemsActions } from "./store/items/itemsSlice";
import { fetchUser } from "./utils/fetchLocalData";

export const App = () => {
  const dispatch = useDispatch();

  const retrieveData = () => {
    getAllFoodItems().then((data) => {
      dispatch(itemsActions.retrieveAllFoodItems(data));
    });
  };

  useEffect(() => {
    retrieveData();
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
